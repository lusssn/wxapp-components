## 自定义弹窗组件说明
更新时间：2017-10-23

### 一、用法
1. 在wxml中引入模板
    ```html
    <import src="../../component/modal/modal.wxml"/>
    <!-- * 建议放在文件末端 -->
    <template wx:if="{{modal}}" is="modal" data="{{...modal}}"/>
    ```

2. 在wxss中引入样式
    若多处使用建议在app.wxss中引入
    ```scss
    @import './component/modal/modal.wxss';
    ```

3. 在js中引入和使用
    ```javascript
    import Modal from '../../component/modal/modal'
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

### 二、方法说明
| 参数名       | 类型   |是否必填  |描述            |有效值     |
|:----------- |:------ |:-------:|:-------------- |:-------- |
| scope       | object |Y        |Page作用域      |           |
| config      | object |Y        |组件可配置参数   |           |
| configType  | number |N        |初始化类型       |0，1，2    |

- configType有效值说明  

| 值 |描述                                 |
|:--:|:---------------------------------- |
| 0  | 仅在第一次show的时候初始化（default） |
| 1  | 第一次show初始化全部，之后只初始化内容 |
| 2  | 每一次show都初始化全部               |


### 三、配置项说明
| Param Name   | Type                  |Required |Description             | e.g.     |
|:------------ |:--------------------- |:-------:|:---------------------- |:-------- |
| title        | string                |N        |弹层标题                 |'删除提示' |
| content      | string<br>stringArray |N        |弹层正文                 |'确认删除？'<br>['确认删除','10086','吗？'] |
| cancelText   | string                |N        |左边按钮文案              |'取消'    |
| confirmText  | string                |N        |右边按钮文案，默认为：确认 |'是的'    |
| confirm      | function              |N        |左边按钮回调              |         |
| cancel       | function              |N        |右边按钮回调              |         |   

- content为数组时，单数下标会呈现高亮。
- 回调方法的默认行为会关闭弹框。
