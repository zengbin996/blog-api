const COS = require('cos-nodejs-sdk-v5')
const multer = require('multer')

const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    // 指定文件名
    cb(null, file.originalname)
  },
})

const uploadLocal = multer({ storage: storage }).single('file')

const uploadFile = (req, res, next) => {
  res.cc(req.file)
}

const uploadFileOss = (req, res, next) => {
  const file = req.file

  cos.uploadFile(
    {
      Bucket: process.env.Bucket,
      Region: process.env.Region,
      Key: file.originalname,
      FilePath: file.path,
    },
    (err, data) => {
      if (err) {
        res.status(500).cc(err)
      } else {
        res.cc(data)
      }
    }
  )
}

module.exports = {
  uploadLocal,
  uploadFile,
  uploadFileOss,
}
