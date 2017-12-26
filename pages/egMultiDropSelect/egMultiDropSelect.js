import DropSelect from '../../components/dropSelect/dropSelect'

Page({
  onLoad () {
    const self = this
    const dropSelectCpnt = new DropSelect(self)
    dropSelectCpnt.init({
      mode: 'multi',
      options: [
        {
          name: 'status',
          data: [
            {id: 0, name: '全部水果'},
            {id: 1, name: '热带水果'},
            {id: 2, name: '浆果'},
            {id: 3, name: '其他'}
          ]
        }, {
          name: 'fruits',
          data: [{id: -1, name: '饮料列表'}]
        }
      ],
      afterSelect (selected) {
        console.log(selected)
        self.setData({
          result: selected.name
        })
      }
    })
  }
})
