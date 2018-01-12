## 自定义单选组件说明
更新时间：2018-01-12

<img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-radio.png" width="30%">

### 一、用法
1. 在page.json中设置
    ```json
    {
      "usingComponents": {
        "cpnt-radio": "../../components/cpntRadio/cpntRadio"
      }
    }
    ```

2. 在wxml中使用
    ```html
    <cpnt-radio data="{{radioItems}}" bindchange="bindRadioChange"></cpnt-radio>
    ```

3. 在js中获取滑动选择的值
    ```javascript
    Page({
      bindRadioChange (e) {
        const self = this
        self.setData({
          result: JSON.stringify(e.detail.value)
        })
      }
    })
    ```

### 二、属性说明
| 属性名          | 类型        | 默认值  | 描述                                             | 有效值      |
|:-------------- |:----------- |:------:|:------------------------------------------------ |:--------- |
| data           | ObjectArray | []     | 组件数据，对象数组，子项必须包含id和name字段         | [<br>　{id: 1, name: '是'}<br>] |
| multiple       | Boolean     | false  | 是否支持多选                                      |          |
| selected-index | Number      | 0      | 默认选中项的下标，multiple为false时有效。           | 小于0则为0，大于data长度，则为data长度减1 |
| bindchange     | Function    |        | 点击radio选项后触发的事件，e.detail.value表示当前值 |          |

**注意：**multiple为true时，value为选中项的id数组。