/**
 * @description utils api 路由
 * @author zhenganlin
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginCheck')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file']
    if(!file) return 
    
    const { size, path, name, type } = file
    // koaForm 中间件执行之后会在默认目录下存储文件，我们需要拿到他重新存到我们需要的地方
    ctx.body = await saveFile({
        size,
        name,
        type,
        filePath: path
    })
})

module.exports = router