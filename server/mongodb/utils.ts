import { v4 } from 'uuid'
import CryptoJS from 'crypto-js'

/**
 * CryptoJS 加密
 *
 * @param {String} encryptData  需要加密数据
 * @returns 加密后的数据
 * @memberof Utils
 */
export const encrypt = (encryptData: string): string => {
  const key = CryptoJS.enc.Utf8.parse('as-Crypto-js')
  const srcs = CryptoJS.enc.Utf8.parse(encryptData)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

/**
 * CryptoJS 解密
 *
 * @param {String} encryptData  需要加密数据
 * @returns 解密后的数据
 * @memberof Utils
 */
export const decrypt = (encryptData: string): string => {
  const key = CryptoJS.enc.Utf8.parse('as-Crypto-js')
  const decrypt = CryptoJS.AES.decrypt(encryptData, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export const uuid = () => {
  return v4()
}

// 判断参数是否为空对象
export const checkParam = (param: Record<string, unknown> | null): boolean => {
  return JSON.stringify(param) === '{}' || !param
}

// 判断数据是否存在
export const checkExist = (param: Record<string, unknown> | null, schema: any) => {
  return new Promise((resolve, reject) => {
    if (checkParam(param)) {
      reject(new Error('参数不能为空!'))
    } else {
      schema.findOne(param).then((data: Record<string, unknown> | null) => {
        if (checkParam(data)) {
          resolve(true)
        } else {
          reject(new Error('数据已存在!'))
        }
      })
    }
  })
}

// 创建数据
export const create = (param: Record<string, unknown> | null, schema: any) => {
  return new Promise((resolve, reject) => {
    if (checkParam(param)) {
      reject(new Error('参数不能为空!'))
    } else {
      schema.create(param).then((data: Record<string, unknown> | null) => {
        if (!checkParam(data)) {
          resolve(data)
        } else {
          reject(new Error('创建数据失败!'))
        }
      })
    }
  })
}

// 查找数据
export const findOne = (param: Record<string, unknown> | null, schema: any) => {
  return new Promise((resolve, reject) => {
    if (checkParam(param)) {
      reject(new Error('参数不能为空!'))
    } else {
      schema.findOne(param).then((data: Record<string, unknown> | null) => {
        if (checkParam(data)) {
          resolve(null)
        } else {
          resolve(data)
        }
      })
    }
  })
}
