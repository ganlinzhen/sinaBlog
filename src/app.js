const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')

// 路由
const userViewRouter = require('./routes/views/user')
const userApiRouter = require('./routes/api/uers')
const errorViewRouter = require('./routes/views/error')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// 模板引擎配置
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session+cookie配置
app.keys = ['ui@qqq9989']
app.use(session({
    key: 'weibo.sid',// cookie name 默认koa.sid
    prefix: 'weibo:sess', // redis 中key的session前缀. 默认 'koa:sess'
    cookie: {
        path: '/', // 所有路由都可以用cookie
        httpOnly: true,
        maxAge: 24*60*60*1000, //ms 过期时间
    },
    // ttl: 24*60*60*1000, // redis 过期时间 默认与上面的maxage相同
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// routes
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
