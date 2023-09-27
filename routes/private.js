const router = require('express').Router()
const { resetPassword } = require('../validates/users')
const { updatePassword } = require('../routers-handler/update-password')
const { uploadLocal, uploadFile, uploadFileOss } = require('../routers-handler/file-upload')

//修改密码
router.post('/update-password', resetPassword, updatePassword)

//上传照片 直接传文件
router.post('/file/uploads', uploadLocal, uploadFile)

//上传照片到oss
router.post('/file-oss/uploads', uploadLocal, uploadFileOss)

module.exports = router
