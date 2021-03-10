/**
 * @description 封装 sequelize 数据类型
 * @author zhenganlin
*/

const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING(126),
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN,
}