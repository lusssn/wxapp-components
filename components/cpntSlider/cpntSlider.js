Component({
  properties: {
    // 最小值
    min: {
      type: Number,
      value: 0
    },
    // 最大值
    max: {
      type: Number,
      value: 100
    },
    // 步长
    step: {
      type: Number,
      value: 1
    },
    // 初始值
    value: {
      type: Number,
      value: 0
    }
  },
  data: {},
  ready () {
    const _this = this
    _this.setData({
      $track: _this.createSelectorQuery().select('#cpnt-slider-track').boundingClientRect(),
      $control: _this.createSelectorQuery().select('#cpnt-slider-control').boundingClientRect()
    })
    // 初始化slider的滑动范围和滑块移动距离
    _this.data.$track.exec((trackRects) => {
      const trackRect = trackRects.shift()
      _this.data.$control.exec((controlRects) => {
        const controlRect = controlRects.shift()
        const range = trackRect.width - controlRect.width
        const oneStepLength = _this._getOneStepLength(range)
        console.log('range: ', range)
        console.log('oneStep: ', oneStepLength)
        _this.setData({
          oneStepLength,
          range,
          trackLeft: trackRect.left,
          distance: _this.data.value * oneStepLength
        })
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
      return Math.round((controlRect.left - _this.data.trackLeft) / oneStep) * oneStep
    },
    _getValue () {
      console.log('distance: ', this.data.distance)
      return Math.floor(this.data.distance / this.data.oneStepLength)
    },
    onChange () {
      const _this = this
      _this.data.$control.exec((controlRects) => {
        const controlRect = controlRects.shift()
        _this.setData({
          distance: _this._getDistance(controlRect)
        })
        // emit event
        _this.triggerEvent('sliderchange', {
          value: _this._getValue()
        })
      })
    }
  }
})
