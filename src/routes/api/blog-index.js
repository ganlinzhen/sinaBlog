/**
 * @description 博客首页 接口路由
 * @author zhenganlin
*/
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheck')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { create } = require('../../controller/blog-index')

router.prefix('/api/blog')

// 创建博客
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx,next) => {
    const { content, image } = ctx.request.body 
    ctx.body = await create(ctx, {content, image})
})

module.exports = router