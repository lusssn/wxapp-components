import Uploader from '../../components/uploader/uploader'

Page({
  onLoad () {
    const self = this
    // 组件初始化
    const uploader = new Uploader(this, (resFilesPath) => {
      // 为了展示，resFilesPath为数组
      const files = self.data.uploader.files || []
      self.setData({
        'uploader.files': files.concat(resFilesPath || [])
      })
    }, 4)
  }
})
