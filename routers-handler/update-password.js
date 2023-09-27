const { connect } = require('../db/index')

const updatePassword = async (req, res, next) => {
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
}

module.exports = {
  updatePassword,
}
