Component({
  properties: {
    data: {
      type: Array, value: []
    },
    selectedIndex: {
      type: Number, value: 0
    }
  },
  attached () {
    if (this.data.selectedIndex >= this.data.data.length) {
      this.setData({
        selectedIndex: this.data.data.length - 1
      })
    }
    if (this.data.selectedIndex < 0) {
      this.setData({
        selectedIndex: 0
      })
    }
  },
  methods: {
    onRadioChange (e) {
      const _this = this
      _this.setData({
        selectedIndex: +e.currentTarget.dataset.index
      })
      _this._emitEvent()
    },
    _emitEvent () {
      const _this = this
      // emit event
      _this.triggerEvent('change', {
        value: _this.data.data[_this.data.selectedIndex]
      })
    }
  }
})
