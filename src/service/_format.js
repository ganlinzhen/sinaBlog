/**
 * @description 数据格式化
 * @author zhenganlin
*/
const { DEFAULT_PiCTURE } = require('../conf/constant')

/**
 * @description 格式化用户头像
 * @param {Object} obj 用户信息
 */
function formatUserPicture (obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PiCTURE
    }
    return obj
}

/**
 * @description 格式化用户信息
 * @param {objecct|array} list
 */
function formatUser (list) {
    if (list == null) {
        return list
    }
    // 数组用户列表
    if (list instanceof Array) {
        return list.map(formatUserPicture)
    }
    // 数组单个对象
    return formatUserPicture(list)
}

module.exports = {
    formatUser 
}