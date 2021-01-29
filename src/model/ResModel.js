/**
 * @description 接口返回的数据类型
 * @author zhenganlin
 * */ 


/**
 * @description 基础模块
 * */ 
class BasicModel {
    constructor ({ errno, data, message }) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

/**
 * @description 成功的数据模型
 * */ 
class ErrorModel extends BasicModel {
    constructor ({errno, message}) {
        super({errno, message})
    }
}

/**
 * @description 失败的数据模型
 * */ 
class SuccessModel extends BasicModel {
    constructor (data = {}) {
        super({errno:0, data})
    }
}

module.exports = {
    ErrorModel,
    SuccessModel,
}