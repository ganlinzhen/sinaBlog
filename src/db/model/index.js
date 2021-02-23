/**
 * @description 数据模型管理
 * @author zhenganlin
*/
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

/**
 * 外键管理
 * */ 

// 查微博的时候关联用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

// 用户 与 关注关系
// User.hasMany(UserRelation) 与 UserRelation.belongsTo(User) 
// 意思相同的是: 在 UserRelation表中添加 User的主键作为外键
// 唯一的不同是: 代表了连表查询的两个方向
UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog,
    UserRelation,
}