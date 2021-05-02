## bootstrap 常用样式
> 栅格
```
col-md-xx col-sm-xx ...
```

> 隐藏类样式
```
hidden-xs hidden-sm ...
```
> 布局类
> + .row
> + .container
> + .flex-row
> + .flex-column

> + pull-left - 左浮动
> + pull-right - 右浮动
> + text-right  文字右对齐

-------
> clearfix - 清除浮动
```code
center-block - 内容变成块元素，并且居中
show - 显示
hidden - 隐藏
sr-only - 隐藏在屏幕阅读器显示(不常用)
```

> 按钮样式
```code
默认样式 - class = btn btn-default
深色样式 - class = btn btn-primary
天蓝样式 - class = btn btn-info
绿色样式 - class = btn btn-success
黄色样式 - class = btn btn-warring
红色样式 - class = btn btn-danger
链接样式 - class = btn btn-link
```

# m-web
移动Web端-响应式


1. 分析结构

2. 通过源码选择器覆盖组件本身的选择器, 修改样式

3. 响应式功能实现 (小屏幕的隐藏, 高度对齐)




1.浪费带宽
2.影响页面加载效率

--
按需加载
pc端--加载pc端图片 >768px
移动端--加载pc端图片<768px

--
控制属性出现,  控制dom元素
js 辅助开发

--
数据动态渲染
* (动态创建元素, 字符串拼接, 模板引擎, 框架渲染)

/*ui框架: bootstrap, 妹子ui ,jqueryUi,easyUI,jqueryMobile, mui, framework7*/
/*关于移动端UI框架: bootstrap, jqueryMobile, mui, framework7*/
/*模板引擎:  art-template , handlebars, mustache, baiduTemplate, velocity,  underscore*/

## css 高度垂直居中
```
使用padding去挤压, 不要 line-height
padding : 40px 0;
```

## 做数据缓存 第一次请求的data 放到window上, 当有缓存时候, 无需请求数据, 无数据时候需要请求数据
``` javascript
  var getData = function (callback) {
    // 缓存了数据
    if (window.data) {
      callback && callback(window.data);
    } else {
      // 没有数据调用接口, 缓存数据 render
      /*1.获取轮播图数据  ajax*/
      $.ajax({
        type: "get",
        url: "json/data.json",
        dataType: "json" /*强制转换后台返回的数据 为 json 对象 */,
        /*强制转换不成功程序报错,  不会执行success, 执行error 回调*/
        data: {},
        success: function (data) {
          // 回调函数
          window.data = data; //缓存数据
          callback && callback(window.data); // 渲染数据
        },
      });
    }
  };
  var render = function () {
    getData(function (data) {
      // console.log(data)
      /*2.根据轮播图数据动态渲染, 根据当前设备  屏幕宽度判断 $.width(),选择大图小图 ,768px*/
      var isMobile = $(window).width() < 768 ? true : false;
      console.log(data);
      /*2.2 把数据转换成html 格式的字符串*/
      /*使用模板引擎, 那些html静态内容需要变成动态的*/
      /*发现: 点容器  图片容器  新建模板*/
      /*开始使用*/
      /*<% console.log(list) %>   模板引擎内不可使用外部变量*/
      var ponitHtml = template("pointTemplate", { list: data });
      // console.log('ponitHtml', ponitHtml)
      var imageHtml = template("imageTemplate", { list: data, isM: isMobile });
      console.log("imageTemplate", imageHtml);

      /*2.3 把字符串渲染页面当中*/
      $(".carousel-indicators").html(ponitHtml);

      $(".carousel-inner").html(imageHtml);
    });
  };
    $(window).on("resize", function () {
      render();
      /* 通过js 主动触发某个事件 */
    })
    .trigger("resize");
```
### 移动端响应式页签

适配方案
1. 流式布局 (就是百分比布局, 注重视口 *)                                                    
2. bootstrap 响应式  (注重栅格 grid, gutter: 槽距)
3. rem + less + zepto + 移动端适配方式 

* 移动端适配方式
    1. 移动端以流式布局为主
    2. 百分比布局
    3. 非固定像素布局
    4. 无法准确计算容器的尺寸


ajax 不支持跨域

为了解决跨域
> jsonP
> cors

.end()   
找到元素上一个  设置样式

.andSelf() 
不光是自己设置，  并且和上一个  都要设置样式


#### zepto 移动端常用库
#### swiper 轮播图库