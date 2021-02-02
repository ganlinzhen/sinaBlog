/**
 * @description 博客相关接口路由
 * @author zhenganlin
*/
const router = require('koa-router')()

router.prefix('/api/blog')

// 创建博客
router.post('createBlog', (ctx,next) => {

})

module.exports = router