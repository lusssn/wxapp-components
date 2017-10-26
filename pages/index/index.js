import Picker from '../../component/picker/picker'

let picker

Page({
  onLoad () {
    picker = new Picker(this)
    picker.init({
      title: '喜欢的水果',
      active: [0], // 对应列选中的项的下标
      columns: ['苹果', '香蕉', '芒果'], // 列，二维数组，单列支持一维数组
      confirm: _pickerConfirm // 点击确认的回调方法，第一个参数为选择的项
    })
  },
  toShowModal () {
    wx.navigateTo({
      url: '../../pages/modal/modal'
    })
  },
  bindShowPicker () {
    picker.show()
  }
})

function _pickerConfirm (select) {
  console.log(select)
}
