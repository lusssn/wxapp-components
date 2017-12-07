## 图片上传组件说明
更新时间：2017-10-26

### 一、用法
1. 在wxml中引入模板
   ``` html
   <import src="../../component/uploader/uploader.wxml"/>
   <!-- data参数必须以uploader为key -->
   <template is="uploader" data="{{uploader}}"/>
   ```

2. 在wxss中引入样式
   ```scss
   @import '../../component/uploader/uploader.wxss';
   ```

3. 在js中引入和使用
    ```javascript
    import Uploader from '../../component/uploader/uploader'
    const uploader = new Uploader(this, (resFilesPath) => {
      // 注意：该处的处理逻辑请自己实现
      const files = _this.data.uploader.files || []
      files.push(resFilesPath)
      _this.setData({
        'uploader.files': files
      })
    }, 2)
    ```  

### 二、组件构造方法说明
| 参数名       | 类型      |是否必填  |描述                                |
|:----------- |:-------- |:-------:|:--------------------------------- |
| scope       | object   |Y        |Page作用域                          |
| success     | function |Y        |需要在成功回调中更新 uploader.files   |
| limit       | number   |N        |最多可传张数，0表示无限制              | 
