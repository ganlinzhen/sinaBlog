/**
 * @description 用户数据模型
 * @author zhenganlin
*/

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// user 
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comments: '用户名，唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comments: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comments: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        comments: '性别（1 男性，2 女性，3 保密）',
    },
    picture: { 
        type: STRING,
        comments: '用户头像'
    },
    city: { 
        type: STRING,
        comments: '城市'
    },
})

module.exports = User