const express = require('express')
const router = express.Router()
const validates = require('../validates/users')

//注册
router.post('/register', validates.register, function (req, res, next) {
  res.send('register')
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
