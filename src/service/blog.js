/**
 * @description 博客相关的service
 * @author zhenganlin
 * */ 
const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

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


/**
 *根据用户名获取博客列表
 * @param {*} { userName, pageIndex=0, pageSize=10} 参数
 */
async function getBlogListByUser ({ userName, pageIndex=0, pageSize=10} ) {
    const whereOpt = {}
    if (userName) {
        whereOpt.userName = userName
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName','nickName','picture'],
                where: whereOpt,
            }
        ]
    })

    // 博客列表
    let blogList = result.rows.map(blog => blog.dataValues)
    blogList = blogList.map(blog => {
        blog.user = formatUser(blog.user.dataValues)
        return blog
    })
    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
}