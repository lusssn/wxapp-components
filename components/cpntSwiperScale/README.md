## 缩放切换效果的Swiper组件
更新时间：2018-01-17

<img src="http://oyd1mgz9y.bkt.clouddn.com/wxapp-components-swiper-scale.webp" width="30%">

### 一、用法
1. 在page.json中设置
    ```json
    {
      "usingComponents": {
        "cpnt-swiper-scale": "../../components/cpntSwiperScale/cpntSwiperScale"
      }
    }
    ```

2. 在wxml中使用
    ```html
    <cpnt-swiper-scale image-urls="{{imageUrls}}" bindchange="bindChange"/>
    ```

### 二、属性说明
| 属性名       | 类型     | 默认值  | 描述                                                  |有效值      |
|:----------- |:-------- |:------:|:----------------------------------------------------- |:--------- |
| cardWidth   | Number   | 300    | 卡片宽度                                               |           |
| cardHeight  | Number   | 300    | 卡片高度                                               |           |
| scale       | Number   | 0.92   | 缩放比                                                 |           |
| imageUrls   | Array    | []     | 渲染的图片路径数组                                      |           |
| bindchange  | Function |        | 组件滑动后触发的事件，e.detail.value表示当前选中图片的下标 |          |

### 三、特殊说明
1. 组件适合图片不要少于2张的场景。
2. 卡片宽高按照375像素的屏幕宽度标准，单位是px。
3. 组件计算宽度时会按照rpx进行转换，但是高度保持px。