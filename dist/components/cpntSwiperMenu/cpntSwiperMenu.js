Component({
  properties: {
    menuWidth: {
      type: Number, value: 160
    },
    threshold: {
      type: Number, value: 40
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  methods: {
    onSwitchMenu () {
      this.setData({
        switchLeft: this.data.menuWidth - (this.data.switchLeft || 0)
      })
    },
    onTouchStart (e) {
      const touch = e.changedTouches[0] || e.touches[0]
      this.setData({
        touchStartX: touch.clientX
      })
    },
    onTouchEnd (e) {
      const _this = this
      const margin = e.changedTouches[0].clientX - _this.data.touchStartX
      // 向右滑动
      if (margin > _this.data.threshold) {
        _this.setData({
          switchLeft: _this.data.menuWidth
        })
        return
      }
      // 向左滑动
      if (margin < -(_this.data.threshold)) {
        _this.setData({
          switchLeft: 0
        })
        return
      }
      _this.setData({
        switchLeft: _this.data.switchLeft
      })
    }
  }
})
