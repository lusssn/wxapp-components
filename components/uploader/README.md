## 图片上传组件说明
更新时间：2018-03-12

<img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-uploader.png" width="30%">

### 一、用法
1. 在wxml中引入模板
   ``` html
   <import src="../../components/uploader/uploader.wxml"/>
   <!-- data参数必须以uploader为key -->
   <template is="uploader" data="{{uploader}}"/>
   ```

2. 在wxss中引入样式
   ```scss
   @import '../../components/uploader/uploader.wxss';
   ```

3. 在js中引入和使用
    ```javascript
    import Uploader from '../../components/uploader/uploader'
    Page({
      onLoad () {
        const self = this
        // 组件初始化，最多可上传4张图片
        const uploader = new Uploader(this, (resFilesPath) => {
          // 请注意：
          // 如果在components/uploader/uploader.js中_addImg使用的是 A段代码，resFilesPath是一个 字符串；
          // 此处的resFilesPath为 数组，是因为内_addImg中使用的是 B段代码，便于做效果展示。
          const files = self.data.uploader.files || []
          self.setData({
            'uploader.files': files.concat(resFilesPath || [])
          })
        }, 4)
      }
    })
    ```  

### 二、组件构造方法说明
| 参数名       | 类型     | 是否必填 | 描述                                   |
|:----------- |:-------- |:-------:|:------------------------------------- |
| scope       | object   | Y       | Page作用域                             |
| success     | function | Y       | **需要在成功回调中更新uploader.files**   |
| limit       | number   | N       | 最多可传张数，0表示无限制                | 
 
### 三、特殊说明
1. 图片上传的服务器地址，需要使用者在 `components/uploader/uploader.js` 下 `_uploadImg`方法中自行设置，根据使用者项目的具体要求，可能还需要自行改造wx.uploadFile方法的选项。
2. 请注意 `components/uploader/uploader.js` 下 `_addImg`方法中的注释内容，实际使用时需要保留A段，去掉B段。
3. 选择图片（_chooseImg）后，循环并上传（_uploadImg）选择的图片至服务器端，每上传成功一张，就会调用成功回调方法，使用者应该在成功回调方法中，将上传成功的图片路径更新到Page.data.uploader.files里。