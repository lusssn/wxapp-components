## 自定义滚动选择组件说明
更新时间：2017-10-25

### 一、用法
1. 在wxml中引入模板
   ``` html
   <import src="../../components/picker/picker.wxml"/>
   <!-- 必须添加 wx:if 的判断，data参数必须为...picker -->
   <template wx:if="{{picker}}" is="picker" data="{{...picker}}"/>
   ```

2. 在wxss中引入样式
   ```scss
   @import '../../components/picker/picker.wxss';
   ```

3. 在js中引入和使用
    ```javascript
    import Picker from '../../components/picker/picker'
    const picker = new Picker(this)
    picker.init({
       title: '身份证对应身份',
       active: [0], // 对应列选中的项的下标
       columns: ['申请人', '配偶', '其他'], // 列，二维数组，单列支持一维数组
       confirm: _roleConfirm // 点击确认的回调方法，第一个参数为选择的项
     })
    picker.show()
    ```
    - 建议在onLoad中创建实例，在需要的地方进行初始化  

### 组件方法说明
1. constructor  
   说明：构造方法  
   场景：通过关键字new创建一个实例时调用。
     
   P 1：Object scope  
   说明：使用组件的Page的作用域。  
2. init  
   说明：初始化组件
   场景：渲染数据并显示组件。
   
   P 1：Json config
   说明：此方法会覆盖原有数据。 
3. hide  
   说明：隐藏组件
4. show
   说明：显示组件
5. getSelected 
   说明：获取选择的内容