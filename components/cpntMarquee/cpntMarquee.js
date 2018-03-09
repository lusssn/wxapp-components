Component({
  properties: {
    // 数据集
    dataset: {
      type: Array, value: ['暂无数据']
    },
    // 滚动器高度
    height: {
      type: Number, value: 50
    }
  },
  data: {},
  attached () {
    const dataset = this.data.dataset
    dataset.push(dataset[0])
    this.setData({
      dataset
    })
  },
  ready () {
    this.animation = wx.createAnimation()
    this._initAnimation()
  },
  methods: {
    _initAnimation () {
      const _this = this
      _this.createSelectorQuery().select('#cnpt-marquee').boundingClientRect((rect) => {
        if (!rect.height) return
        // 计算滚动器的高度
        _this.marqueeHeight = rect.height - _this.data.height
        let scrollIndex = 1
        let scrollTop = 0
        setInterval(() => {
          if (scrollTop >= _this.marqueeHeight) {
            // reset
            scrollIndex = 1
            _this.setData({
              marqueeAnimation: _this.animation.translateY(0).step({duration: 0}).export()
            })
          }
          scrollTop = _this.data.height * scrollIndex
          // 延迟处理，避免与reset的时候渲染冲突
          setTimeout(() => {
            _this.setData({
              marqueeAnimation: _this.animation.translateY(-scrollTop).step().export()
            })
          }, 200)
          scrollIndex++
        }, 1600)
      }).exec()
    }
  }
})
