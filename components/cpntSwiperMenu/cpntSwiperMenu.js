Component({
  properties: {
    menuWidth: {
      type: Number, value: 160
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  attached () {
    this.setData({
      scrollLeft: this.data.menuWidth
    })
  },
  methods: {
    onSwitchMenu () {
      const scrollLeft = this.data.scrollLeft
      this.setData({
        scrollLeft: scrollLeft ? 0 : this.data.menuWidth
      })
    },
    onTouchStart (e) {
      this.setData({
        touchStartX: e.changedTouches[0].clientX
      })
    },
    onTouchEnd (e) {
      const _this = this
      const menuWidth = _this.data.menuWidth
      const margin = e.changedTouches[0].clientX - _this.data.touchStartX
      const threshold = Math.floor(menuWidth / 3)
      // 向右滑动
      if (margin > threshold) {
        _this.setData({
          scrollLeft: 0
        })
        return
      }
      // 向左滑动
      if (margin < -threshold) {
        _this.setData({
          scrollLeft: menuWidth
        })
        return
      }
      _this.setData({
        scrollLeft: _this.data.scrollLeft
      })
    }
  }
})
