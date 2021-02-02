/**
 * @description 博客数据校验
 * @author zhenganlin
 * */ 
const validate = require('./_validate')

const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        image: {
            type: 'string',
            maxLength: 255,
        }
    }
}

/**
 * 校验函数
 * @param { Object } data
*/
function bolgValidate (data) {
    return validate(SCHEMA, data)
}

module.exports = bolgValidate