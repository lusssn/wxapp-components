'use strict'
let SELECTED

/*
 * 隐藏组件
 * @scope page
 */
const _hide = function () {
  const scope = this
  scope.setData({
    'picker.hide': true
  })
}

/*
 * 显示组件
 * @scope page
 */
const _show = function () {
  const scope = this
  scope.setData({
    'picker.hide': false
  })
}

/*
 * 监听组件value改变
 * @scope page
 */
const _change = (e) => {
  SELECTED.active = e.detail.value
}

/*
 * 获取选择的值
 * @scope page
 * @return SELECTED JSON 当前选中的值，包括id和name
 */
const _getSelected = function () {
  const scope = this

  for (const strName of SELECTED.name) {
    if (strName === undefined || strName === '') {
      _getName(scope.data.picker.columns)
      break
    }
  }

  return JSON.parse(JSON.stringify(SELECTED))
}

/*
 * 获取当前选择的name
 * @scope component
 * @param arrColumns Array 组件渲染的data
 * @return arrName Array 当前选中的值的name
 */
const _getName = function (arrColumns) {
  // 换取name
  for (let i = 0; i < arrColumns.length; i++) {
    const arrColumn = arrColumns[i]
    for (let j = 0; j < arrColumn.length; j++) {
      if (j === SELECTED.active[i]) {
        SELECTED.name[i] = arrColumn[j]
        break
      }
    }
  }
  return SELECTED.name
}

export default class Picker {
  constructor (scope) {
    this.scope = scope
  }

  init (config) {
    const _this = this
    const scope = this.scope
    const data = {
      title: '',
      hide: true,
      active: [],
      columns: []
    }
    SELECTED = {
      active: [],
      name: ['']
    }
    if (Array.isArray(config.columns) && Array.isArray(config.columns[0])) {
      data.columns = config.columns
    } else if (Array.isArray(config.columns)) {
      data.columns.push(config.columns)
    }

    if (config.title) {
      data.title = config.title
    }

    if (Array.isArray(config.active)) {
      data.active = SELECTED.active = config.active
    } else if (!isNaN(config.active)) {
      data.active.push(config.active)
      SELECTED.active.push(config.active)
    }
    scope.setData({
      picker: data
    })
    // 事件绑定
    scope.pickerBack = _hide
    if (config.confirm && typeof config.confirm === 'function') {
      _this.CONFIRM_CALLBACK = config.confirm
    }
    scope.pickerConfirm = function () {
      const that = this
      _hide.call(that)
      _getName(that.data.picker.columns)
      if (_this.CONFIRM_CALLBACK && typeof _this.CONFIRM_CALLBACK === 'function') {
        const selected = _getSelected.call(that)
        _this.CONFIRM_CALLBACK.call(that, selected)
      }
    }
    scope.pickerChange = _change
  }

  hide () {
    _hide.call(this.scope)
  }

  show () {
    _show.call(this.scope)
  }

  getSelected () {
    return _getSelected.call(this.scope)
  }
}
