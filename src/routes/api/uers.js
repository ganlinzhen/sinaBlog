/**
 * @description 用户相关接口
 * @author zhenganlin
*/

const router = require('koa-router')()
const { 
    isExist,
    register, 
    login,
    logout,
    changeInfo,
    changePassword,
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginCheck')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 用户登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
    console.log(JSON.stringify(ctx.session))
})

// // 删除用户
// router.post('/delete', loginCheck, async (ctx, next) => {
//     if (isTest) {
//         // 测试环境下，测试账号登录之后，删除自己
//         const { userName } = ctx.session.userInfo
//         ctx.body = await deleteCurUser(userName)
//     }
// })

// 修改用户信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, picture, city } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, picture, city })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    ctx.body = await changePassword(ctx, password, newPassword)
})

// 用户退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router