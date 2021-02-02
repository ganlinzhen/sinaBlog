/**
 * @description 微博首页接口
 * @author zhenganlin
*/
const { createBlog } = require('../service/blog')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const xss = require('xss')

/**
 * 创建微博
 * @param {*} ctx
 * @param {*} param 博客内容 {content, image}
 */
async function create (ctx, {content, image}) {
    console.log('创建博客controller')
    const { id: userId } = ctx.session.userInfo
    try {
        const result = await createBlog({ 
            userId,
            content: xss(content),
            image
        })
        // 创建成功
        if (result) {
            return new SuccessModel(result)
        }
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
} 

module.exports = {
    create
}