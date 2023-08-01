const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const jwt = require('express-jwt')
const { ValidationError } = require('express-validation')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const docsRouter = require('./routes/docs')

const app = express()

//设置跨域请求
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//封装处理方法
app.use((req, res, next) => {
  res.cc = (data, message = '操作成功', status = '0') => {
    res.send({ status, message, data })
  }
  next()
})

app.use('/decs', docsRouter)
app.use('/', indexRouter)
app.use('/api/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  //数据验证错误
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).status(err.statusCode).json(err)
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
