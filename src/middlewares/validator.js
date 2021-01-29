/**
 * @description 校验中间件
 * @author zhenganlin
*/
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成JSON schema 验证的中间件的函数
 * @param {*} validateFn
 * @returns middleware
 */
function genValidator(validateFn) {
    async function validator (ctx, next) {
        // 校验
        const error = validateFn(ctx.request.body)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return 
        }
        // 验证通过
        await next() // 如果没有下面的代码，这句可以省略
    }
    return validator
}

module.exports = {
    genValidator
}