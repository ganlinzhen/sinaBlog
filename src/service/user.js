/**
 * @description user service
 * @author zhenganlin
*/

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * @param {*} userName
 * @param {*} password
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        whereOpt.password = password
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id','userName','nickName','picture','gender','city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * @description 创建新用户
 * @param {string} userName
 * @param {string} password
 * @param {string} nickName
 * @param {string} gender
*/
async function createUser({ userName, password, gender, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName || userName,
        gender,
    })
    return result.dataValues
}

/**
 * @description 更新用户信息
 * @param {Object} 
*/
async function updateUserInfo (
    { newNickName, newPicture, newCity, newPassword },
    { userName, password },
) {
    // 拼接修改内容
    const updataData = {}
    if (newNickName) updataData.nickName = newNickName
    if (newPicture) updataData.picture = newPicture
    if (newCity) updataData.city = newCity
    if (newPassword) updataData.password = newPassword

    // 查询条件
    const whereOpt = {
        userName: userName
    }
    if (password) whereOpt.password = password

    // 修改数据记录
    const result = await User.update(updataData, {
        where: whereOpt
    })

    // 修改的行数
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    updateUserInfo
}