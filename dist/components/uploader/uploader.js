'use strict'
export default class Uploader {
  constructor (scope, success, limit = 0) {
    const _this = this
    if (!scope || !scope.onLoad) {
      return
    }
    scope.setData({
      uploader: {
        limit: limit
      }
    })
    scope.deleteUploaderImg = _deleteUploaderImg
    scope.previewUploaderImg = _previewImage
    scope.addUploaderImg = function () {
      _addImg.call(_this)
    }
    _this.scope = scope
    _this.success = success
  }
}

function _previewImage (e) {
  const scope = this
  const numImgIndex = e.target.dataset.ii
  const arrFiles = scope.data.uploader.files

  if (isNaN(numImgIndex)) return

  wx.previewImage({
    current: arrFiles[numImgIndex],
    urls: arrFiles
  })
}

function _deleteUploaderImg (e) {
  const scope = this
  const numImgIndex = e.currentTarget.dataset.ii
  const arrFiles = scope.data.uploader.files

  arrFiles.splice(numImgIndex, 1)

  scope.setData({
    'uploader.files': arrFiles
  })
}

function _chooseImg (size) {
  return new Promise((resolve) => {
    wx.chooseImage({
      count: size || 9,
      sizeType: ['compressed'],
      success: (chooseRes) => {
        resolve(chooseRes.tempFilePaths)
      }
    })
  })
}

function _uploadImg (filePath) {
  wx.showToast({
    title: '上传中',
    duration: 20000
  })
  return new Promise((resolve) => {
    wx.uploadFile({
      url: '', // 上传地址
      name: 'file',
      filePath: filePath,
      success (uploadRes) {
        if (!uploadRes || !uploadRes.data) {
          wx.showToast({
            title: '上传失败'
          })
          return
        }
        const res = JSON.parse(uploadRes.data)
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        })
        resolve(res)
      },
      fail () {
        wx.showToast({
          title: '上传失败'
        })
      }
    })
  })
}

function _addImg () {
  const _this = this
  const scope = _this.scope
  _chooseImg(_calculateChooseSize(scope.data.uploader)).then((arrFilePaths) => {
    // A. 为了示例注释下面代码，实际使用时应该启用
    // for (const filePath of arrFilePaths) {
    //   // 单张上传图片，成功后在sccuess中将接口返回的图片路径更新到uploader.files里
    //   _uploadImg(filePath).then((res) => {
    //     typeof _this.success === 'function' && _this.success(res)
    //   })
    // }
    // B. 为了示例，上面注释代码改为下面代码，实际使用时应该去掉
    typeof _this.success === 'function' && _this.success(arrFilePaths)
  })
}

function _calculateChooseSize (uploader) {
  const limit = uploader.limit
  const currentLength = (uploader.files && uploader.files.length) || 0

  if (!limit) return 9

  const diff = limit - currentLength

  if (diff > 9) return 9
  if (diff < 0) return 0

  return diff
}
