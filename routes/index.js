const express = require('express')
const router = express.Router()
const validates = require('../validates/users')
const { register, login } = require('../routers-handler/users')

//注册
router.post('/register', validates.register, register)

//登录
router.post('/login', validates.login, login)

module.exports = router
