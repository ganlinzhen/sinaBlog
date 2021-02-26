/**
 * @description 微博首页接口
 * @author zhenganlin
*/
const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../service/blog')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../service/user')
const { createAtRelation } = require('../service/at-relation')


/**
 * 创建微博
 * @param {*} ctx
 * @param {*} param 博客内容 {content, image}
 */
async function create (ctx, {content, image}) {
    // 分析并收集 content 中 @ 的用户
    // content 格式如： '哈喽 @李四 - lisi 你好'
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr
        }
    )
    // 根据用户名 查询用户信息
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )
    // 获 @ 取用户id
    const atUserIdList = atUserList.map(user => user.id)

    // 创建博客
    const { id: userId } = ctx.session.userInfo
    try {
        // 创建博客-service
        const blog = await createBlog({ 
            userId,
            content: xss(content),
            image
        })

        // 创建 @ 关系
        await Promise.all(atUserIdList.map(
            userId => createAtRelation(blog.id, userId)
        ))

        // 创建成功
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
} 

/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: count === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList,
}