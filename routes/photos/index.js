const router = require('express').Router()

//新增
const addPhotos = (req, res) => {
  res.cc('该接口正在开发中')
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

router.post('/api/photos', addPhotos)
router.delete('/api/photos', deletePhotos)
router.patch('/api/photo', updatePhoto)
router.get('/photos', getPhotos)

module.exports = router
