const { connect } = require('../db/index')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
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

const login = async (req, res, next) => {
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

module.exports = {
  register,
  login,
}
