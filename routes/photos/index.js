const router = require('express').Router()
const validates = require('../../utils/validates/photos')
const { connect } = require('../../utils/db/index')

//新增
const addPhotos = async (req, res) => {
  const db = await connect()
  const collection = db.collection('photos')

  collection
    .insertOne({
      ...req.body,
    })
    .then((insertResult) => {
      res.cc(insertResult)
    })
}

//删除
const deletePhotos = (req, res) => {
  res.cc('该接口正在开发中')
}

//修改
const updatePhoto = (req, res) => {
  res.cc('该接口正在开发中')
}

//查询
const getPhotos = (req, res) => {
  res.cc('该接口正在开发中')
}

router.post('/api/photos', validates.postPhotos, addPhotos)
router.delete('/api/photos', deletePhotos)
router.patch('/api/photo', updatePhoto)
router.get('/photos', getPhotos)

module.exports = router
