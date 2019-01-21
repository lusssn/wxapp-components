Component({
  properties: {
    cardWidth: {
      type: Number, value: 300
    },
    cardHeight: {
      type: Number, value: 300
    },
    scale: {
      type: Number, value: 0.92
    },
    imageUrls: {
      type: Array, value: []
    }
  },
  data: {
    current: 1,
    amount: 0, // length of imagesUrls
    margin: 0,
    threshold: 40
  },
  attached () {
    const _this = this
    _this._setBaseConfig()
  },
  methods: {
    _setBaseConfig () {
      const _this = this
      // 扩大2倍，用rpx计算
      const cardWidth = _this.data.cardWidth * 2
      _this.setData({
        cardWidth,
        amount: _this.data.imageUrls.length,
        margin: 375 - _this.data.cardWidth,
        baseStyle: `width: ${cardWidth}rpx; height: ${_this.data.cardHeight}px;`
      })
      _this.animation = wx.createAnimation()
    },
    onTouchStart (e) {
      const touch = e.changedTouches[0] || e.touches[0]
      this.setData({
        touchStartX: touch.clientX
      })
    },
    onTouchEnd (e) {
      const _this = this
      const moveDistance = e.changedTouches[0].clientX - _this.data.touchStartX
      const cardWidth = _this.data.cardWidth
      const margin = _this.data.margin
      const amount = _this.data.amount
      let current = _this.data.current
      // 向右滑动
      if (moveDistance > _this.data.threshold) {
        current--
      }
      // 向左滑动
      if (moveDistance < -(_this.data.threshold)) {
        current++
      }
      // 滑到左边尽头
      if (current === -2) {
        _this.animation.left(`${margin - cardWidth * (amount - 1)}rpx`).step({duration: 0})
        _this.setData({
          animationData: _this.animation.export()
        })
        current = amount + current
      }
      // 滑到右边尽头
      if (current === amount + 1) {
        _this.animation.left(`${margin}rpx`).step({duration: 0})
        _this.setData({
          animationData: _this.animation.export()
        })
        current = 1
      }
      _this.animation.left(`${margin - cardWidth * current}rpx`).step({duration: 400})
      setTimeout(() => {
        _this.setData({
          current,
          animationData: _this.animation.export()
        })
        _this._emitEvent()
      }, 100)
    },
    _emitEvent () {
      const _this = this
      // emit event
      _this.triggerEvent('change', {
        value: (_this.data.amount + _this.data.current) % _this.data.amount
      })
    }
  }
})
