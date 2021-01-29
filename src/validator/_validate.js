/**
 * @description JSON Schema 校验
 * @author zhenganlin 
*/
const Ajv = require('ajv').default
const ajv = new Ajv() // { allErrors: true} // 输出所有的错误--默认为false，只输出第一个错误
    


/**
 * schema 校验方法
 * @param {Object} data   待校验的数据
 * @param {Object} schema JOSN scheme 校验规则
 * */ 

function validate (schema, data={}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate