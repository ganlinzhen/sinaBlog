/**
 * @description 用户相关接口
 * @author zhenganlin
*/

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', (ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router