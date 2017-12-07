'use strict'
// 1. 仅在第一次show的时候初始化（default）
// const TYPE_JUST_ONCE = 0
// 2. 第一次show初始化全部，之后只初始化内容
const TYPE_JUST_CONTENT = 1
// 3. 每一次show都初始化全部
const TYPE_EVERY_TIME = 2

let CONFIG = {}
let CONFIRM_CALLBACK
let CANCEL_CALLBACK

/*
 * 对象是否为空
 * @param obj 判断对象
 */
const isEmptyObj = (obj) => {
  for (const name in obj) {
    if (!obj.hasOwnProperty(name)) {
      continue
    }
    return false
  }
  return true
}
/*
 * 隐藏模态框
 * @scope page
 */
const _hide = function () {
  this.setData({
    'modal.hide': true
  })
}

export default class Modal {
  /*
   * 显示模态框
   * @scope page
   * @param config
   */
  static show (scope, config, configType = 0) {
    if (!scope || !scope.onLoad) {
      return
    }

    if (isEmptyObj(scope.data.modal) || configType === TYPE_EVERY_TIME) {
      CONFIG = {
        title: config.title,
        content: [],
        cancelText: config.cancelText,
        confirmText: config.confirmText,
        hide: false
      }

      if (Array.isArray(config.content)) {
        CONFIG.content = config.content
      } else {
        CONFIG.content.push(config.content)
      }

      CONFIRM_CALLBACK = config.confirm
      CANCEL_CALLBACK = config.cancel

      scope.modalControl = function (e) {
        const key = e.target.id
        if (key === 'modal_confirm') {
          typeof CONFIRM_CALLBACK === 'function' && CONFIRM_CALLBACK()
        } else if (key === 'modal_cancel') {
          typeof CANCEL_CALLBACK === 'function' && CANCEL_CALLBACK()
        }
        _hide.call(scope)
      }
      scope.setData({
        modal: CONFIG
      })
    } else if (configType === TYPE_JUST_CONTENT) {
      scope.setData({
        'modal.content': Array.isArray(config.content) ? config.content : [config.content],
        'modal.hide': false
      })
    } else {
      scope.setData({
        'modal.hide': false
      })
    }
  }
}
