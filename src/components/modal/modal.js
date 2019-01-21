'use strict'
/**
 * configType有效值：all（default），content，event，once
 * all：每一次show都更新内容和事件
 * content：第一次show初始化全部，之后只更新内容
 * event：第一次show初始化全部，之后只更新事件
 * once：仅在第一次show初始化全部
 */
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

export default class Modal {
  /*
   * 显示模态框
   * @scope page
   * @param config
   */
  static show (scope, config, configType = 'all') {
    if (!scope || !scope.onLoad) {
      return
    }
    // 1. 第一次或者类型是all
    if (isEmptyObj(scope.data.modal) || configType === 'all') {
      _initModal(scope, config)
      return
    }
    // 2. 仅更新内容
    if (configType === 'content') {
      scope.setData({
        'modal.content': Array.isArray(config.content) ? config.content : [config.content],
        'modal.hide': false
      })
      return
    }
    // 3. 仅更新事件
    if (configType === 'event') {
      _setEvent(config)
    }
    // 4. once模式
    scope.setData({
      'modal.hide': false
    })
  }
}

function _initModal (scope, config) {
  CONFIG = {
    title: config.title,
    content: [],
    cancelText: config.cancelText,
    cancelShare: config.cancelShare,
    confirmText: config.confirmText,
    confirmShare: config.confirmShare,
    hide: false
  }

  if (Array.isArray(config.content)) {
    CONFIG.content = config.content
  } else {
    CONFIG.content.push(config.content)
  }

  _setEvent(config)

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
}

function _setEvent (config) {
  CONFIRM_CALLBACK = config.confirm
  CANCEL_CALLBACK = config.cancel
}

/*
 * 隐藏模态框
 * @scope page
 */
function _hide () {
  this.setData({
    'modal.hide': true
  })
}
