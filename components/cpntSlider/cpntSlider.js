Component({
  properties: {
    // 最小值
    min: {
      type: Number, value: 0
    },
    // 最大值
    max: {
      type: Number, value: 100
    },
    // 步长
    step: {
      type: Number, value: 1
    },
    // 初始值
    value: {
      type: Number, value: 0
    },
    // 方向
    direction: {
      type: String, value: 'horizontal'
    }
  },
  data: {},
  ready () {
    const _this = this
    _this.setData({
      $track: _this.createSelectorQuery().select('#cpnt-slider-track').boundingClientRect(),
      $control: _this.createSelectorQuery().select('#cpnt-slider-control').boundingClientRect(),
      step: _this.data.step < 1 ? 1 : _this.data.step
    })
    // 初始化slider的滑动范围和滑块移动距离
    _this.data.$track.exec((trackRects) => {
      const trackRect = trackRects.shift()
      _this.data.$control.exec((controlRects) => {
        const controlRect = controlRects.shift()
        let range
        if (_this.data.direction === 'vertical') {
          range = trackRect.height - controlRect.height
        } else {
          range = trackRect.width - controlRect.width
        }
        const oneStepLength = _this._getOneStepLength(range)
        _this.setData({
          oneStepLength,
          range,
          trackTop: trackRect.top,
          trackLeft: trackRect.left,
          distance: _this.data.value * oneStepLength
        })
        _this._emitEvent()
      })
    })
  },
  methods: {
    _getOneStepLength (range) {
      const _this = this
      const data = _this.data
      return (range / Math.floor((data.max - data.min) / data.step)).toFixed(2)
    },
    _getDistance (controlRect) {
      const _this = this
      const oneStep = _this.data.oneStepLength
      if (_this.data.direction === 'vertical') {
        return Math.round((controlRect.top - _this.data.trackTop) / oneStep) * oneStep
      }
      return Math.round((controlRect.left - _this.data.trackLeft) / oneStep) * oneStep
    },
    _getValue () {
      return Math.floor(this.data.distance / this.data.oneStepLength)
    },
    onChange () {
      const _this = this
      _this.data.$control.exec((controlRects) => {
        const controlRect = controlRects.shift()
        _this.setData({
          distance: _this._getDistance(controlRect)
        })
        _this._emitEvent()
      })
    },
    _emitEvent () {
      const _this = this
      // emit event
      _this.triggerEvent('change', {
        value: _this._getValue()
      })
    }
  }
})
