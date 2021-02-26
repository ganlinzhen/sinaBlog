/**
 * @description 博客首页 接口路由
 * @author zhenganlin
*/
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheck')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { create } = require('../../controller/blog-index')
const { getHomeBlogList } = require('../../controller/blog-index')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

// 创建博客
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx,next) => {
    const { content, image } = ctx.request.body 
    ctx.body = await create(ctx, {content, image})
})

// 个人主页加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx,next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const { id: userId } = ctx.session.userInfo
    const result = await getHomeBlogList(userId, pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router