/**
 * @description sequelize 同步数据库
 * @author zhenganlin
 */

const seq = require('./seq')

const { User, Blog, UserRelation} = require('./model/index')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

// 执行同步
seq.sync({ force: true }).then( async() => {
    // 插入数据
    await User.create({ userName: "zhenganlin", password: "8afc5c1df7608340f37ec72885fdf87c", nickName: '甄甘霖', gender: 1 })
    await User.create({ userName: "wangwei", password: "8afc5c1df7608340f37ec72885fdf87c", nickName: '王威', gender: 1 })
    await User.create({ userName: "zhaojinyin", password: "8afc5c1df7608340f37ec72885fdf87c", nickName: '赵金印', gender: 1 })
    await UserRelation.create({ userId: 1, bloggerId: 1})
    await UserRelation.create({ userId: 1, bloggerId: 2})
    await UserRelation.create({ userId: 1, bloggerId: 3})
    await UserRelation.create({ userId: 2, bloggerId: 1})
    await UserRelation.create({ userId: 3, bloggerId: 1})
    await Blog.create({ userId: 1,content:'甄甘霖的第一条微博',image:'/1614244701668_OIP (1).jpeg'})
    await Blog.create({ userId: 2,content:'王威的第一条微博',image:'/1614244701668_OIP (1).jpeg'})
    await Blog.create({ userId: 3,content:'赵金印的第一条微博',image:'/1614244701668_OIP (1).jpeg'})
    await Blog.create({ userId: 1,content:'甄甘霖的第二条微博',image:'/1614244701668_OIP (1).jpeg'})
    await Blog.create({ userId: 3,content:'赵金印的第三条微博',image:'/1614244701668_OIP (1).jpeg'})
    await Blog.create({ userId: 1,content:'甄甘霖的第三条微博',image:'/1614244701668_OIP (1).jpeg'})
    console.log('sync ok')
    process.exit()
})
