import Picker from '../../components/picker/picker'

Page({
  global: {},
  onLoad () {
    this.global.pickerCpnt = new Picker(this)
    this.global.pickerCpnt.init({
      title: '喜欢的水果',
      active: [1, 0, 1], // 对应列选中的项的下标
      columns: [['昨天', '今天', '明天'], ['A.M.', 'P.M.'], ['草莓', '葡萄', '芒果', '榴莲']], // 列，二维数组，单列支持一维数组
      confirm: _pickerConfirm // 点击确认的回调方法，第一个参数为选择的项
    })
  },
  toPage (e) {
    const pageName = e.currentTarget.dataset.page
    wx.navigateTo({
      url: `../../pages/${pageName}/${pageName}`
    })
  },
  bindShowPicker () {
    this.global.pickerCpnt.show()
  }
})

function _pickerConfirm (select) {
  console.log(select)
}
