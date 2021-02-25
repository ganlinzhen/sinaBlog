/**
 * @description 微博相关的路由
 * @author zhenganlin
*/
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheck')
const { isExist } = require('../../controller/user')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFansData, getFollowersData } = require('../../controller/user-relation')

// 博客首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index')
})

// 个人主页
// 默认跳转到自己的个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录用户信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    // 返回的用户信息 userInfo
    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        // 用户名不存在
        if (existResult.errno !== 0) {
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }

    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝数据
    const fansResult = await getFansData(curUserInfo.id)
    const { count: fansCount, userList: fanList } = fansResult.data
    
    // 是否关注了当前用户
    const amIFollowed = fanList.some(item => item.userName === myUserName)
    
    // 获取关注人列表
    const followersResult = await getFollowersData(curUserInfo.id)
    const { count: followersCount, list: followersList } = followersResult.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                list: fanList,
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed
        }
    })
})

// 微博广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    console.log(result)
    const { isEmpty, blogList, pageSize, pageIndex=0, count } = result.data || {}
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router