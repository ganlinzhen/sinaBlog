/**
 * @description 博客相关的service
 * @author zhenganlin
 * */ 
const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

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
    blogList = formatBlog(blogList)
    blogList = blogList.map(blog => {
        blog.user = formatUser(blog.user.dataValues)
        return blog
    })
    return {
        count: result.count,
        blogList
    }
}

/**
 * 获取用户关注人的博客列表
 * @param {*} { userName, pageIndex=0, pageSize=10} 参数
 */
async function getFollowersBlogList ({userId, pageIndex=0, pageSize=10}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName',"nickName","picture"],
            },
            {
                model: UserRelation,
                attributes: ['userId','bloggerId'],
                where: {
                    userId
                }
            }
        ]
    })
    // 处理博客列表
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList,
}