/**
 * @description 连接redis 提供 get/post
 * @author zhenganlin
*/

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建redis客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('redis error', err)
})

/**
 * @description redis set
 * @param {string} key 键
 * @param {string|object} val 值
 * @param {number} expire 过期时间，单位s
*/
function set(key, val, timeout = 1 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * @description redis get
 * @param {string} key 键
*/
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err,val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                reject(ex)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get,
}