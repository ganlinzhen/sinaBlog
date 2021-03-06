const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const userViewRouter = require('./routes/views/user')
const userApiRouter = require('./routes/api/uers')
const blogViewRouter = require('./routes/views/blog')
const blogHomeApiRouter = require('./routes/api/blog-index')
const blogProfileApiRouter = require('./routes/api/blog-profile')
const blogSquareApiRouter = require('./routes/api/blog-square')
const blogAtMeApiRouter = require('./routes/api/blog-at')
const utilsApiRouter = require('./routes/api/utils')
const errorViewRouter = require('./routes/views/error')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname + '/public')))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))
// 模板引擎配置
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session+cookie配置
app.keys = [SESSION_SECRET_KEY]
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
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(blogProfileApiRouter.routes(), blogProfileApiRouter.allowedMethods())
app.use(blogSquareApiRouter.routes(), blogSquareApiRouter.allowedMethods())
app.use(blogAtMeApiRouter.routes(), blogAtMeApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
