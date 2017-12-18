import Uploader from '../../components/uploader/uploader'

Page({
  onLoad () {
    const _this = this
    // 组件初始化
    const uploader = new Uploader(this, (resFilesPath) => {
      // 为了展示，resFilesPath为数组
      const files = _this.data.uploader.files || []
      _this.setData({
        'uploader.files': files.concat(resFilesPath || [])
      })
    }, 2)
  }
})