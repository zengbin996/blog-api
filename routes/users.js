const express = require('express')
const router = express.Router()
const validates = require('../validates/users')
const { connect } = require('../db/index')
const jwt = require('jsonwebtoken')

//注册
router.post('/register', validates.register, async (req, res, next) => {
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
})

//登录
router.post('/login', validates.register, async function (req, res, next) {
  const db = await connect()
  const collection = db.collection('users')
  const userInfo = { username: req.body.username, password: req.body.password }

  const single = await collection.findOne(userInfo)

  if (single) {
    const token = jwt.sign(userInfo, 'zb123', { expiresIn: '12h' })

    res.cc({
      token: 'Bearer ' + token,
      expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
    })
  } else {
    res.status(400).cc(undefined, '用户名或密码错误')
  }
})

//退出登录
router.post('/logout', function (req, res, next) {
  res.send('logout')
})

module.exports = router
