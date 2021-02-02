/**
 * @description 微博相关的路由
 * @author zhenganlin
*/

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheck')

// 博客首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index')
})


module.exports = router