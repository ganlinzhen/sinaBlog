/**
 * @description 用户关系 controller
 * @author zhenganlin
*/
const { getUsersByBloggerId, addFollower, removeFollower, getFollowersByUserId } = require('../service/user-relation')
const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

/**
 * @description 根据userid获取粉丝列表
 * @param {number} userId 用户id
 * @return fansData = { count, list }
 */
async function getFansData (userId) {
    const { count, userList } = await getUsersByBloggerId(userId)
    return new SuccessModel({
        count,
        userList
    })
}


/**
 * @description 关注用户
 * @param 
 */
async function follow (userId, curUserId) {
    // 不能关注自己
    if (userId === curUserId) {
        return new ErrorModel(addFollowerFailInfo)
    }
    // 目标用户得存在
    let info = await getUserInfo(null,null,curUserId)
    if (!info) {
        return new ErrorModel(addFollowerFailInfo)
    }
    // 关注方法
    try {
        await addFollower(userId, curUserId)
        return new SuccessModel()
    } catch (ex) {
        console.error(ex)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * @description 取消关注
 * @param 
 */
async function unFollow (userId, curUserId) {
    // 不能关注自己
    if (userId === curUserId) {
        return new ErrorModel(addFollowerFailInfo)
    }
    // 目标用户得存在
    let info = await getUserInfo(null,null,curUserId)
    if (!info) {
        return new ErrorModel(addFollowerFailInfo)
    }
    // 关注方法
    const result = await  removeFollower(userId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(addFollowerFailInfo)
}

/**
 * @description 根据userid关注人列表
 * @param {number} userId 用户id
 * @return fansData = { count, list }
 */
async function getFollowersData (userId) {
    const { count, list } = await getFollowersByUserId(userId)
    return new SuccessModel({ count, list })
}

module.exports  = {
    getFansData,
    follow,
    unFollow,
    getFollowersData
}