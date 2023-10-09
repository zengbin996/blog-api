const mongoose = require('mongoose')
const { MONGODB_URL, DB_NAME } = process.env

async function connect() {
  await mongoose.connect(MONGODB_URL)
  const db = mongoose.connection.useDb(DB_NAME)
  return db
}

module.exports = { connect }
