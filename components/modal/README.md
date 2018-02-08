## 自定义弹窗组件说明
更新时间：2018-02-08

<img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-modal-title.png" width="30%"> <img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-modal-heightlight.png" width="30%"> <img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-modal-one-btn.png" width="30%">

### 一、用法
1. 在wxml中引入模板
    ```html
    <import src="../../components/modal/modal.wxml"/>
    <!-- * 建议放在文件末端 -->
    <template wx:if="{{modal}}" is="modal" data="{{...modal}}"/>
    ```

2. 在wxss中引入样式
    若多处使用建议在app.wxss中引入
    ```scss
    @import '../../components/modal/modal.wxss';
    ```

3. 在js中引入和使用
    ```javascript
    import Modal from '../../components/modal/modal'
    Modal.show(self, {
        content: '是否删除？',
        cancelText: '取消',
        confirmText: '是的',
        confirm: function () {
          // 确定回调
        },
        cancel: function () {
          // 取消回调
        }
    })
    ```

### 二、Show方法说明
| 参数名       | 类型   |是否必填  |描述            |有效值     |
|:----------- |:------ |:-------:|:-------------- |:-------- |
| scope       | object |Y        |Page作用域      |           |
| config      | object |Y        |组件可配置参数   |           |
| configType  | string |N        |初始化类型       |all（default），content，event，once    |

- configType有效值说明  

| 值       |描述                                  |
|:--------:|:------------------------------------ |
| all      | **默认值**，每一次show都更新内容和事件  |
| content  | 第一次show初始化全部，之后只更新内容    |
| event    | 第一次show初始化全部，之后只更新事件    |
| once     | 仅在第一次show初始化全部               |


### 三、配置项说明
| Param Name   | Type                  |Required | Description             | e.g.     |
|:------------ |:--------------------- |:-------:|:----------------------- |:-------- |
| title        | string                |N        | 弹层标题                 |'删除提示' |
| content      | string<br>stringArray |N        | 弹层正文                 |'确认删除？'<br>['确认删除','10086','吗？'] |
| cancelText   | string                |N        | 左边按钮文案              |'取消'    |
| confirmText  | string                |N        | 右边按钮文案，默认为：确认 |'是的'    |
| confirm      | function              |N        | 左边按钮回调              |         |
| cancel       | function              |N        | 右边按钮回调              |         |   
| confirmShare | boolean               |N        | 右边按钮是否可分享         |         |   
| cancelShare  | boolean               |N        | 左边按钮是否可分享         |         |   

- content为数组时，单数下标会呈现高亮。
- 回调方法的默认行为会关闭弹框。
