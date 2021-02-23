/**
 * @description 用户关系数据模型
 * @author zhenganlin
*/

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
    }
});

module.exports = UserRelation