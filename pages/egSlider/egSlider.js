Page({
  bindSliderChange (e) {
    const self = this
    self.setData({
      result: e.detail.value
    })
  }
})
