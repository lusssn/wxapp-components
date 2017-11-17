import Picker from '../../component/picker/picker'

let picker

Page({
  onLoad () {
    picker = new Picker(this)
    picker.init({
      title: '喜欢的水果',
      active: [1, 0], // 对应列选中的项的下标
      columns: [['昨天', '今天', '明天'], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], ['苹果', '香蕉', '芒果']], // 列，二维数组，单列支持一维数组
      confirm: _pickerConfirm // 点击确认的回调方法，第一个参数为选择的项
    })
  },
  toModal () {
    wx.navigateTo({
      url: '../../pages/egModal/egModal'
    })
  },
  bindShowPicker () {
    picker.show()
  },
  toUploder () {
    wx.navigateTo({
      url: '../../pages/egUploader/egUploader'
    })
  }
})

function _pickerConfirm (select) {
  console.log(select)
}
