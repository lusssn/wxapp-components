import Modal from '../../component/modal/modal'

Page({
  bindModalTitle () {
    Modal.show(this, {
      title: '提示',
      content: '是否删除？',
      cancelText: '取消',
      confirmText: '是的',
      confirm: function () {
        // 确定回调
      },
      cancel: function () {
        // 取消回调
      }
    }, 2)
  },
  bindModalHighlight () {
    Modal.show(this, {
      content: ['确认删除','10086','吗？'],
      cancelText: '取消',
      confirmText: '是的',
      confirm: function () {
        // 确定回调
      }
    }, 2)
  },
  bindModalOneButton () {
    Modal.show(this, {
      content: '10086已删除',
      confirmText: '知道了',
      confirm: function () {
        // 确定回调
      }
    }, 2)
  }
})