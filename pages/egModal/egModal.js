import Modal from '../../components/modal/modal'

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
    })
  },
  bindModalHighlight () {
    Modal.show(this, {
      content: ['确认删除', '10086', '吗？'],
      cancelText: '取消',
      confirmText: '是的',
      confirm: function () {
        // 确定回调
      }
    })
  },
  bindModalOneButton () {
    Modal.show(this, {
      content: '10086已删除',
      confirmText: '知道了',
      confirm: function () {
        // 确定回调
      }
    })
  },
  bindModalShare () {
    Modal.show(this, {
      content: '分享10086给朋友吗？',
      cancelText: '不了',
      confirmText: '分享',
      confirmShare: true,
      confirm: function () {
        // 确定回调
      }
    })
  }
})
