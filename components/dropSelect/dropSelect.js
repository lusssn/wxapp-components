'use strict'
/**
 * 根据key获取value
 * @param id
 * @param data
 * @returns {string}
 * @private
 */
const _getName = function (id, data) {
  for (const o of data) {
    if (o.id === id) {
      return o.name
    }
  }
  return ''
}

/**
 * 无label的菜单切换事件
 * @param e
 * @private
 */
const _multiSwitchTab = function (e) {
  const scope = this
  const dropSelectData = scope.data.dropSelect
  const numSelectIndex = e.currentTarget.dataset.select_index
  const arrIsFold = dropSelectData.isFold
  const numOptionsLength = dropSelectData.data[numSelectIndex].options.length

  // 点击项判断，与current相同则判断isFold
  if (numSelectIndex === dropSelectData.current) {
    for (let i = 0; i < arrIsFold.length; i++) {
      if (numSelectIndex === i && arrIsFold[i]) {
        // 无选项直接置为true（收起），否则展开（false）
        arrIsFold[i] = !numOptionsLength
      } else {
        arrIsFold[i] = true
      }
    }
    scope.setData({
      'dropSelect.isFold': arrIsFold
    })
  } else {
    for (let i = 0; i < arrIsFold.length; i++) {
      arrIsFold[i] = true
    }
    scope.setData({
      'dropSelect.current': numSelectIndex,
      'dropSelect.isFold': arrIsFold
    })
    if (typeof scope.afterDropSelectCallback === 'function') {
      const selected = _getSelected.call(scope)
      scope.afterDropSelectCallback(selected)
    }
  }
}

/**
 * 无label的菜单选择事件
 * @param e
 * @private
 */
const _multiSelect = function (e) {
  const scope = this
  const numSelectIndex = e.currentTarget.dataset.select_index
  const strOptionId = e.target.dataset.option_id

  const objDataItem = scope.data.dropSelect.data[numSelectIndex]
  const arrOptions = objDataItem.options
  let current = objDataItem.current

  for (let i = 0; i < arrOptions.length; i++) {
    if (arrOptions[i].id === strOptionId) {
      current = arrOptions[i]
      break
    }
  }
  scope.setData({
    ['dropSelect.data[' + numSelectIndex + '].current']: current,
    ['dropSelect.isFold[' + numSelectIndex + ']']: true
  })

  if (typeof scope.afterDropSelectCallback === 'function') {
    const selected = _getSelected.call(scope)
    scope.afterDropSelectCallback(selected)
  }
}

/**
 * 无label的菜单收起事件
 * @private
 */
const _multiFold = function () {
  const scope = this
  const numCurrent = scope.data.dropSelect.current
  scope.setData({
    ['dropSelect.isFold[' + numCurrent + ']']: true
  })
}

/**
 * 带label的菜单展开／收起事件
 * @private
 */
const _singleSwitch = function () {
  const scope = this
  scope.setData({
    'dropSelect.isFold': !scope.data.dropSelect.isFold
  })
}

/**
 * 带label的菜单收起事件
 * @private
 */
const _singleFold = function () {
  const scope = this
  scope.setData({
    'dropSelect.isFold': true
  })
}

/**
 * 带label的菜单选择事件
 * @param e
 * @private
 */
const _singleSelect = function (e) {
  const scope = this
  const strOptionId = e.target.dataset.option_id

  const objDataItem = scope.data.dropSelect.data
  const arrOptions = objDataItem.options
  let current = scope.data.dropSelect.current

  for (let i = 0; i < arrOptions.length; i++) {
    if (arrOptions[i].id === strOptionId) {
      current = arrOptions[i]
      break
    }
  }

  scope.setData({
    'dropSelect.current': current,
    'dropSelect.isFold': true
  })
  if (typeof scope.afterDropSelectCallback === 'function') {
    const selected = _getSelected.call(scope)
    scope.afterDropSelectCallback(selected)
  }
}

/**
 * 返回组件当前选择项
 * @returns {{}}
 * @private
 */
const _getSelected = function () {
  const scope = this
  const dropSelect = scope.data.dropSelect
  if (dropSelect.mode === 'single') {
    return dropSelect.current
  }
  if (dropSelect.mode === 'multi') {
    const current = dropSelect.current
    return dropSelect.data[current].current
  }
}

export default class DropSelect {
  constructor (scope) {
    if (!scope || !scope.onLoad) {
      return
    }
    this.scope = scope
  }

  init (config) {
    const scope = this.scope
    const {mode, options, active} = config

    const dropSelectConfig = {
      mode: mode
    }
    if (mode === 'multi') { // 无label的单列下拉选择菜单，支持多列
      const arrDropData = []
      const arrIsFold = []
      for (const item of options) {
        const dataItem = {}
        const itemOptions = item.data
        dataItem.name = item.name
        dataItem.options = itemOptions.length === 1 ? [] : item.data
        // 换取默认项的name
        const name = _getName(item.active, itemOptions)
        // 没有换取到name，默认项为第一项
        dataItem.current = {
          id: name ? item.active : itemOptions[0].id,
          name: name || itemOptions[0].name
        }
        arrDropData.push(dataItem)
        arrIsFold.push(true)
      }
      dropSelectConfig.current = active || 0
      dropSelectConfig.data = arrDropData
      dropSelectConfig.isFold = arrIsFold

      scope.multiSwitch = _multiSwitchTab
      scope.multiOption = _multiSelect
      scope.multiFold = _multiFold
    } else if (mode === 'single') { // 有label的单列下拉选择菜单
      // 换取默认项的name
      const name = _getName(active, options.data)
      let current
      if (typeof active === 'string') {
        current = {
          id: 0,
          name: active
        }
      } else {
        current = {
          id: name ? active : options.data[0].id,
          name: name || options.data[0].name
        }
      }
      dropSelectConfig.current = current
      dropSelectConfig.data = {
        name: options.name,
        options: options.data
      }
      dropSelectConfig.isFold = true
      dropSelectConfig.title = config.title

      scope.singleSwitch = _singleSwitch
      scope.singleOption = _singleSelect
      scope.singleFold = _singleFold
    }
    scope.afterDropSelectCallback = config.afterSelect
    scope.setData({
      dropSelect: dropSelectConfig
    })
  }

  getSelected () {
    return _getSelected.call(this.scope)
  }
}
