const router = require('express').Router()
const validates = require('../validates/users')
const { connect } = require('../db/index')
const multer = require('multer')

// 创建一个 Multer 实例，配置文件存储位置和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 指定文件存储的目录
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    // 指定文件名
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

//修改密码
router.post('/update-password', validates.resetPassword, async (req, res, next) => {
  const db = await connect()
  const collection = db.collection('users')

  const single = await collection.findOne({ username: req.auth.username, password: req.body.oldPassword })

  if (single) {
    collection
      .updateOne(
        {
          username: req.auth.username,
        },
        {
          $set: {
            password: req.body.newPassword,
          },
        }
      )
      .then((insertResult) => {
        res.cc(insertResult)
      })
  } else {
    res.status(400).cc(undefined, '原密码错误')
  }
})

//上传照片 直接传文件
router.post('/file/uploads', upload.single('file'), async (req, res, next) => {
  res.cc(req.file)
})

module.exports = router
