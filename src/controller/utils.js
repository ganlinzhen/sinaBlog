/**
 * @description utils api 的controller
 * @author zhenganlin
*/
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fsExtra = require('fs-extra')
const { context } = require('../app')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024

/**
 * 保存文件
 * @param { String } name 文件名字
 * @param { String } type 文件类型
 * @param { String } size 文件大小
 * @param { String } path 文件路径
 * @returns {}
 */
async function saveFile ({ name, type, size, filePath }) {
    if (size > MAX_SIZE) {
        await fsExtra.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    // 移动文件
    const fileName = Date.now() + '_' + name // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fsExtra.move(filePath, distFilePath)

    // 返回信息: 2.png
    return new SuccessModel({
        url: "/" + fileName
    })
}

module.exports = {
    saveFile
}