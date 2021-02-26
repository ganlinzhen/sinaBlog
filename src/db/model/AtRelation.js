/**
 * @description at关系数据模型
 * @arthur zhenganlin
*/
const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id',
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '博客 id',
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false, // 不传默认为false
        comment: '是否已读',
    }
})

module.exports = AtRelation