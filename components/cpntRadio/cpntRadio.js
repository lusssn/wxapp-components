Component({
  properties: {
    data: {
      type: Array, value: []
    },
    selectedIndex: {
      type: Number, value: 0
    },
    multiple: {
      type: Boolean, value: false
    }
  },
  attached () {
    const _this = this
    _this.setData({
      data: JSON.parse(JSON.stringify(_this.data.data))
    })
    if (_this.data.multiple) return
    if (_this.data.selectedIndex >= _this.data.data.length) {
      _this.setData({
        selectedIndex: _this.data.data.length - 1
      })
    }
    if (_this.data.selectedIndex < 0) {
      _this.setData({
        selectedIndex: 0
      })
    }
  },
  methods: {
    onRadioChange (e) {
      const _this = this
      const index = +e.currentTarget.dataset.index
      if (_this.data.multiple) {
        const data = _this.data.data
        data[index].isSelected = !data[index].isSelected
        _this.setData({data})
      } else {
        _this.setData({
          selectedIndex: index
        })
      }
      _this._emitEvent()
    },
    _emitEvent () {
      const _this = this
      // emit event
      if (_this.data.multiple) {
        const result = []
        for (const item of _this.data.data) {
          if (item.isSelected) {
            result.push(item.id)
          }
        }
        _this.triggerEvent('change', {
          value: result
        })
      } else {
        _this.triggerEvent('change', {
          value: _this.data.data[_this.data.selectedIndex]
        })
      }
    }
  }
})
