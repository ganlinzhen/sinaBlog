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
    await User.create({ userName: "zhenganlin", password: "8afc5c1df7608340f37ec72885fdf87c", nickName: 'zhenganlin', gender: 1 })
    await User.create({ userName: "wangwei", password: "8afc5c1df7608340f37ec72885fdf87c", nickName: 'wangwei', gender: 1 })
    await User.create({ userName: "zhaojinyin", password: "8afc5c1df7608340f37ec72885fdf87c", nickName: 'zhaojinyin', gender: 1 })
    await UserRelation.create({ userId: 2, bloggerId: 1})
    await UserRelation.create({ userId: 3, bloggerId: 1})
    console.log('sync ok')
    process.exit()
})
