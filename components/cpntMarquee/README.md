## 文字滚动组件说明
更新时间：2018-03-09

<img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-marquee.gif" width="30%">

### 一、用法
1. 在page.json中设置
    ```json
    {
      "usingComponents": {
        "cpnt-slider": "../../components/cpntMarquee/cpntMarquee"
      }
    }
    ```

2. 在wxml中使用
    ```html
    <cpnt-marquee dataset="{{marqueeList}}"/>
    ```

3. 在js中设置组件的值
    ```javascript
    Page({
      data: {
        marqueeList: [{
          nickname: 'Amy',
          amount: 7
        }, {
          nickname: 'Tom',
          amount: 20.5
        }, {
          nickname: 'Jenny',
          amount: 10
        }]
      }
    })
    ```

### 二、属性说明
| 属性名       | 类型    | 默认值       |描述                       |有效值      |
|:----------- |:------- |:-----------:|:------------------------- |:--------- |
| dataset     | Array   | ['暂无数据'] | 组件显示的文字内容          |           |
| height      | Number  | 50          | 组件高度                   |           |
