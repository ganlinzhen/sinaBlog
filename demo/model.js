const Sequelize = require('sequelize')
const seq =require('./seq.js')

const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '博客标题'
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '博客内容',
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '用户 ID'
    }
})

const User = seq.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '用户名',
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '密码',
    },
})

Blog.belongsTo(User, {
    foreignKey: 'userId',
})
User.hasMany(Blog, {
    foreignKey: 'userId',
})

module.exports = {
    Blog,
    User,
}