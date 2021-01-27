# 仿新浪微博sinaBlog
### 0.功能设计

> * 微博广场
> * 个人主页
> * @功能
> * 关注
> * 评论

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



### 3.最佳实践-项目结构

### 4.架构设计

### 5.api设计

### 6.数据库表


