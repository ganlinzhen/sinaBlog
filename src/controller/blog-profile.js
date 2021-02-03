/**
 * @description 个人主页 controller
 * @author zhenganlin
*/
const { getBlogListByUser } = require('../service/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 *获取个人主页微博列表
 * @param {String} userName
 * @param {Number} pageIndex
 */
async function getProfileBlogList (userName,pageIndex=0) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE,
    })
    const { blogList, count } = result
    // isEmpty, blogList, pageSize, pageIndex, count
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageIndex,
        pageSize: PAGE_SIZE,
        count
    })
}

module.exports = {
    getProfileBlogList
}