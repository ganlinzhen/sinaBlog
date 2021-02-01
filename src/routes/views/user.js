/**
 * @description 用户相关的路由
 * @author zhenganlin
*/

const router = require('koa-router')()

/**
 * 获取登录信息
 * */ 
function getUserInfo (ctx) {
    let data = {
        isLogin: false // 未登录
    }
    // 从session获取信息
    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data
}

// 登录页面
router.get('/login', async (ctx, next) => {
    await ctx.render('login', getUserInfo(ctx))
})

// 注册页面
router.get('/register', async (ctx, next) => {
    await ctx.render('register', getUserInfo(ctx))
})

// 设置页面
router.get('/setting', async (ctx, next) => {
    await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router