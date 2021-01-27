const Sequelize = require('sequelize')

// 连接数据库
const sequelize = new Sequelize('myblog', 'root', '12345678', {
  dialect: 'mysql',   // 这里可以改成任意一种关系型数据库
  host: '127.0.0.1', 
})

module.exports = sequelize
