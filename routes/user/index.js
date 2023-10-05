const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { connect } = require('../../db/index')
const validates = require('../../validates/users')

//注册
const addUser = async (req, res) => {
  const db = await connect()
  const collection = db.collection('users')

  const single = await collection.findOne({ username: req.body.username })
  if (!single) {
    collection
      .insertOne({
        username: req.body.username,
        password: req.body.password,
      })
      .then((insertResult) => {
        res.cc(insertResult)
      })
  } else {
    res.status(400).cc(undefined, '用户名已经被使用')
  }
}

//删除账号
const deleteUser = (req, res) => {
  res.cc('正在开发中')
}

//修改
const updateUser = async (req, res) => {
  const db = await connect()
  const collection = db.collection('users')

  const single = await collection.findOne({ username: req.body.username, password: req.body.oldPassword })

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
}

//登录
const getAuthSign = async (req, res) => {
  const db = await connect()
  const collection = db.collection('users')
  const userInfo = { username: req.body.username, password: req.body.password }

  const single = await collection.findOne(userInfo)

  if (single) {
    const userInfo = { ...single, password: undefined }
    const token = jwt.sign(userInfo, process.env.PRIVATE_KEY, { expiresIn: '7d' })

    res.cc({
      authorization: {
        token: token,
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      },
      userInfo: userInfo,
    })
  } else {
    res.status(400).cc(undefined, '用户名或密码错误')
  }
}

router.post('/', validates.addUser, addUser)
router.delete('/', deleteUser)
router.patch('/', validates.updateUser, updateUser)
router.post('/AuthSign', validates.AuthSign, getAuthSign)

module.exports = router
