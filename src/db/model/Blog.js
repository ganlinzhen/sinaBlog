/**
 * @description 博客数据模型
 * @author zhenganlin
*/
const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID',
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容',
    },
    image: {
        type: STRING,
        comment: '微博图片',
    }
})

module.exports = Blog