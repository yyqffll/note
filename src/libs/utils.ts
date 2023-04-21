import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

export const TOKEN_KEY = 'token'

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7
  })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setLocalStorage = (key: string, value: unknown, days = 1) => {
  // 设置过期原则
  if (!value) {
    localStorage.removeItem(key)
  } else {
    const Days = days // 默认保留1天
    const exp = new Date()
    localStorage[key] = JSON.stringify({
      value,
      expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
    })
  }
}

export const getLocalStorage = (key: string) => {
  try {
    const o = JSON.parse(localStorage[key])
    if (!o || o.expires < Date.now()) {
      return false
    } else {
      return o.value
    }
  } catch (e) {
    // 兼容其他localstorage
    return localStorage[key]
  }
}

export const delLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

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
