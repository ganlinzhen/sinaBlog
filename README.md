# 仿新浪微博sinaBlog
### 0.功能设计

> * 微博广场
> * 个人主页
> * @功能
> * 关注
> * 评论

登录注册页面：登录接口、注册接口、用户名是否存在接口

设置页面：修改密码、修改个人信息、退出登录、图片上传

首页：发布微博、微博列表、加载更多、个人信息、粉丝列表、关注人列表、个人信息

他人主页：微博列表、加载更多、个人信息、粉丝列表、关注人列表、个人信息

@我的：

微博广场：微博列表、加载更多

错误页：

404 页：



### 1.技术栈总结

##### 前端：ejs

##### 后端：koa2.js

##### 测试：jest

##### 数据库：mysql + sequlize.js

##### 进程管理+部署：pm2

##### 入口网关：nginx

##### 登录验证：session+cookie+jwt

##### 项目部署：jenkins https://blog.csdn.net/yunsongfu_/article/details/106128762

##### 开发：

​	1.nodemon：开发环境下不重启的刷新代码

​	2. Corss-env: 设置环境变量

##### git规范：

​	refactor: 目录调整
​    fix: 修复bug

​	feat: 新增功能

##### 环境依赖：mysql、redis



### 2.全栈问题总结

> Koa-router的使用

```js
# 获取参数的问题
// 如果是get请求
router.get('/json/:name', async (ctx, next) => {
   console.log(ctx.params) 
   console.log(ctx.query)
})
'/jons/zhenganlin?age=18&grade=3'
ctx.params => {name:'zhenganlin'}
ctx.query  => {age:18,grade: 3}
// 如果是post请求
router.post('/json', async (ctx, next) => {
   console.log(ctx.request.body) 
})
```

> JWT：JSON + web+Token

```js
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const SECRETKEY = '98kjjkk_wr32'// 自定义秘钥

// 1. koa-jwt：权限校验，如果没有通过则返回401
app.use(jwtKoa({
  secret: SECRETKEY
}).unless({
  path: [/^\/users\/login/] // 自定义哪些目录忽略 jwt 验证
}))
// 2. 登录生成token
router.post('login', async (ctx,next) => {
  const { userName, password } = ctx.request.body
  
  let userInfo
  if (userName === '张三' && password === '1234') {
    //登录成功获取用户信息---模拟从数据库
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三'，
      gender: 1
    }
  }
  // 加密userInfo
  if (userInfo) {
    token = jwt.sign(userInfo, SECRETKEY, {expiresIn : '1h'})
  }
  if (userInfo === null) {
    ctx.body = {
      error: -1,
      msg: '登录失败'
    }
    return
  }
  
  ctx.body = {
    error: 0,
    data: {
      token
    }
    msg: '登录成功'
  }
})
// 3. 根据需要可以解析token获取数据。一般不需要
router.get('getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    // 解析token获取用户信息
    const payload = jwt.verify(**)
  } catch () {
    
  }
})
// 解析token获取用户信息
```

> cookie+session 登录

```js

```

> Redis: 内存数据库

```js

```

> 关系型数据库 三大范式

```js
# 属性的原子性：每一列都不可再拆解
# 记录的唯一性：有唯一标识（主键），其他属性都依赖于主键
# 字段的冗余性：不存在数据冗余和传递依赖
```

### 3.最佳实践-项目结构

参考本项目

### 4.架构设计

![image-20210128144832236](/Users/ganlinzhen/Library/Application Support/typora-user-images/image-20210128144832236.png)

### 5.api设计

登录：

* 登录：/api/user/login

注册：

* 注册：/api/user/register
* 用户名是否存在：/api/user/isExist

设置：

* 修改个人信息：/api/user/changeInfo
* 图片上传：/api/utils/upload
* 修改密码：/api/user/changePassWord
* 退出登录：/api/user/logout

首页：

* 创建微博：/api/blog/create
* 图片上传：/api/utils/upload
* 加载更多：/api/blog/loadMore/:pageIndex

个人主页：

* 加载更多：/api/blog/loadMore/:userName/:pageIndex
* 关注：/api/profile/follow
* 取消关注：/api/profile/unFollow

广场：

* 加载更多：/api/blog/loadMore/:pageIndex

at页面：

* 创建微博：/api/blog/create
* 图片上传：/api/utils/upload
* 加载更多：/api/blog/loadMore/:pageIndex

### 6.数据库表

![image-20210128151314165](/Users/ganlinzhen/Library/Application Support/typora-user-images/image-20210128151314165.png)

![image-20210128151423623](/Users/ganlinzhen/Library/Application Support/typora-user-images/image-20210128151423623.png)

##### 共有四个表

1. 用户表：

2. 博客列表：

3. @关系表：

4. 关注关系表：