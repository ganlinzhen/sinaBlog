/**
 * @description 博客相关的service
 * @author zhenganlin
 * */ 
const { Blog } = require('../db/model/index')


/**
 *创建新的博客
 *@param { Object } param { userId, content, image }
 */
async function createBlog ({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image,
    })
    return result.dataValues
}

module.exports = {
    createBlog
}