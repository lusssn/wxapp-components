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
      result: JSON.stringify(e.detail.value)
    })
  }
})
