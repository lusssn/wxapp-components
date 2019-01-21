Page({
  data: {
    imageUrls: [
      'https://cdn2.ettoday.net/images/2071/2071134.jpg',
      'http://img.hackhome.com/img2016/7/10/2016071056157729.jpg',
      'http://mvimg11.meitudata.com/5542070fca5df617.jpg',
      //'https://cdn.segmentnext.com/wp-content/uploads/2017/11/Pikachu-Talk-620x348.jpg',
      //'https://images.nowloading.co/image/upload/c_fill,h_470,q_auto:good,w_620/jjdrkobuqjbfsicc7nuv.jpg'
    ]
  },
  test () {

  },
  bindChange (e) {
    const self = this
    self.setData({
      result: e.detail.value
    })
  }
})
