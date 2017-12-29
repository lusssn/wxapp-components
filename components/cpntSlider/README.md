## 自定义滑动器组件说明
更新时间：2017-12-29

<img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-slider.png" width="30%">

### 一、用法
1. 在page.json中设置
    ```json
    {
      "usingComponents": {
        "cpnt-slider": "../../components/cpntSlider/cpntSlider"
      }
    }
    ```

2. 在wxml中使用
    ```html
    <cpnt-slider bindchange="bindSliderChange"></cpnt-slider>
    ```

3. 在js中获取滑动选择的值
    ```javascript
    Page({
      bindSliderChange (e) {
        console.log(e.detail.value)
      }
    })
    ```

### 二、属性说明
| 属性名       | 类型     |默认值      |描述                                        |有效值      |
|:----------- |:-------- |:---------:|:------------------------------------------ |:--------- |
| min         | Number   |0          |最小值                                       |           |
| max         | Number   |100        |最大值                                       |           |
| step        | Number   |1          |步长                                         | 取值必须大于 0，并且可被(max - min)整除    |
| direction   | String   |horizontal |滑动器类型                                    | horizontal、vertical    |
| bindchange  | Function |           |滑动器移动后触发的事件，e.detail.value表示当前值 |          |
