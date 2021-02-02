/**
 * @description 数据模型管理
 * @author zhenganlin
*/
const User = require('./User')
const Blog = require('./Blog')

/**
 * 外键管理
 * */ 
// 查微博的时候关联用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog,
}