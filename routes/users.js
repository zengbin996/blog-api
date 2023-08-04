const express = require('express')
const router = express.Router()
const validates = require('../validates/users')
const { connect } = require('../db/index')

//注册
router.post('/register', validates.register, async (req, res, next) => {
  const db = await connect()

  db.collection('users')
    .insertOne({
      username: req.body.username,
      password: req.body.password,
    })
    .then(() => {
      res.send('数据插入成功')
    })
    .catch((error) => {
      console.error('数据插入失败:', error)
    })
})

//登录
router.post('/login', function (req, res, next) {
  res.send('login')
})

//退出登录
router.post('/logout', function (req, res, next) {
  res.send('logout')
})

module.exports = router
