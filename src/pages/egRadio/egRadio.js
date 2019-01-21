Page({
  data: {
    radioItems: [
      {id: 1, name: '是'},
      {id: 2, name: '否'}
    ]
  },
  bindRadioChange (e) {
    const self = this
    self.setData({
      normal: JSON.stringify(e.detail.value)
    })
  },
  bindMultiChange (e) {
    const self = this
    self.setData({
      multiple: JSON.stringify(e.detail.value)
    })
  }
})
