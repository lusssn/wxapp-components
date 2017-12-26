import DropSelect from '../../components/dropSelect/dropSelect'

Page({
  onLoad () {
    const self = this
    const dropSelectCpnt = new DropSelect(self)
    dropSelectCpnt.init({
      mode: 'single',
      title: '选择水果',
      options: {
        name: 'fruits',
        data: [
          {id: 0, name: '全部水果'},
          {id: 1, name: '热带水果'},
          {id: 2, name: '浆果'},
          {id: 3, name: '其他'}
        ]
      },
      afterSelect: (selected) => {
        console.log(selected)
        self.setData({
          result: selected.name
        })
      }
    })
  }
})
