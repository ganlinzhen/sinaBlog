/**
 * @description 用户关系 service
 * @author zhenganlin
 * */ 
const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

/**
 * 获取该用户的粉丝
 * @param {number} bloggerId
*/
async function getUsersByBloggerId (bloggerId) {
    const result = await User.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: {
            model: UserRelation,
            where: {
                bloggerId: bloggerId,
                userId: { [Sequelize.Op.ne]: bloggerId }
            }
        }
    })
    
    // 格式化返回数据
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    // console.log('@粉丝列表：',JSON.stringify(userList))
    // 返回结果
    return {
        count: result.count,
        userList,
    }
}

/**
 * 获取该用户的关注人列表
 * @param {number} userId
*/
async function getFollowersByUserId (userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        where: {
            userId,
            bloggerId: { [Sequelize.Op.ne]: userId }
        },
        include: [{
            model: User,
            attributes: ['id', 'userName', 'nickName', 'picture']
        }]
    })
    // 数据处理
    const userList = result.rows.map(item => item.dataValues)
    const list = userList.map(item => {
        const user = item.user.dataValues
        return formatUser(user)
    })
    return {
        count: result.count,
        list
    }
}

/**
 * 添加关注关系
 * @param {number} userId 用户 id
 * @param {number} bloggerId 被关注用户 id
 */
async function addFollower(userId, bloggerId) {
    const result = await UserRelation.create({
        userId,
        bloggerId,
    })
    return result.dataValues
}

/**
 * 取消关注关系
 * @param {number} userId 用户 id
 * @param {number} bloggerId 被关注用户 id
 */
async function removeFollower(userId, bloggerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            bloggerId,
        }
    })
    return result > 0
}



module.exports = {
    getUsersByBloggerId,
    addFollower,
    removeFollower,
    getFollowersByUserId,
}