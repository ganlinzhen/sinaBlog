/**
 * @description 环境变量
 * @author 甄甘霖
 */

const ENV = process.env.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'test',
    notTest: ENV !== 'test'
}
