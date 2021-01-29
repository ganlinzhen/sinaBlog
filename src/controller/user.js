/**
 * @description user controller
 * @author zhenganlin
*/
const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameExistInfo
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
        return new ErrorModel(registerUserNameExistInfo)
    }
}

module.exports = {
    isExist
}