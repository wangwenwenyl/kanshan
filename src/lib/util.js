/** 
 * @Desc: 工具类
 */
import moment from 'moment'

/**
 * localstorage工具
 */ 
export const localStorageUtil = {
  get: function(key) {
    var value = localStorage.getItem(key)
    return value ? JSON.parse(value) : ''
  },
  set: function(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: function (key) {
    localStorage.getItem(key) && localStorage.removeItem(key)
  }
}

/**
 * sessionStorage工具
 */ 
export const sessionStorageUtil = {
  get: function(key) {
    var value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : ''
  },
  set: function(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove: function (key) {
    sessionStorage.getItem(key) && sessionStorage.removeItem(key)
  }
}

// 验证手机号
export function validataPhone(value) {
  let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  if (null == value || value == '') {
    return false
  } else if ( !value.match(pattern) || value.length != 11) {
    return false
  } else {
    return true
  }
}

// 验证帐号(6~32位字符)
export function validateAccouts(value) {
  let pattern = /^.{6,32}$/
  return Boolean(value.match(pattern))
}


// 验证密码(6~32位字符)
export function validatePassword(value) {
  let pattern = /^.{6,32}$/
  return Boolean(value.match(pattern))
}

// 核对两次密码一致否
export function confirmPassword(password, confirmPassword) {
  return password == confirmPassword 
}

// 验证码长度设置
export function validateCodeLength(value) {
  if (null == value || value == '') {
    return false
  } else if (value.length != 6) {
    return false
  } else return true
}
