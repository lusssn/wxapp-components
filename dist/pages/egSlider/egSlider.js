Page({
  bindChangeH (e) {
    const self = this
    self.setData({
      horizontal: e.detail.value
    })
  },
  bindChangeV (e) {
    const self = this
    self.setData({
      vertical: e.detail.value
    })
  }
})
