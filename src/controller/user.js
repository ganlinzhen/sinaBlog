/**
 * @description user controller
 * @author zhenganlin
*/
const { getUserInfo, createUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/crypto')
const {
    registerUserNameExistInfo,
    registerUserNameNotExistInfo,
    registerFailInfo,
    loginFailInfo,
} = require('../model/ErrorInfo')

/**
 * @description 用户名是否存在
 * @param { string } userName 用户名
*/
async function isExist (userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}


/**
 * @description 用户注册
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @param {*} gender   性别(1 男，2 女，3 保密)
 */
async function register ({userName,password,gender}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    } else {
        try {
            await createUser({userName,password: doCrypto(password),gender})
            return new SuccessModel()
        } catch (err) {
            console.error(ex.message, ex.stack)
            return new ErrorModel(registerFailInfo)
        }
    }
}

/**
 * @description 用户登录接口
 * @ 
*/
async function login (ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    console.log('用户信息：', userInfo)
    // 登录失败：用户名或密码不匹配
    if (userInfo == null) {
        return new ErrorModel(loginFailInfo)
    }
    // 登录成功：将用户信息存入session
    ctx.session.userInfo = userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login
}