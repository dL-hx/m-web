$(function () {
  /*动态轮播图*/
  banner();
});

var banner = function () {
  /*1.获取轮播图数据  ajax*/
  /*2.根据轮播图数据动态渲染, 根据当前设备  屏幕宽度判断 $.width(),选择大图小图 ,768px*/
  /*2.1 准备数据*/
  /*2.2 把数据转换成html 格式的字符串
   * (动态创建元素, 字符串拼接, 模板引擎 [art-template], 框架渲染)
   * */
  /*2.3 把字符串渲染页面当中*/

  /*3.测试功能  监听页面尺寸发生改变,重新渲染*/

  /*4. 移动端手势切换 */

  /*ui框架: bootstrap, 妹子ui ,jqueryUi,easyUI,jqueryMobile, mui, framework7*/
  /*关于移动端UI框架: bootstrap, jqueryMobile, mui, framework7*/

  /*模板引擎:  art-template , handlebars, mustache, baiduTemplate, velocity,  underscore*/

  /* 做数据缓存 第一次请求的data 放到window上, 当有缓存时候, 无需请求数据, 无数据时候需要请求数据*/
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

  //   render();

  // 3.测试功能
  // resize: 监听页面尺寸发生改变事件,重新渲染  监听页面尺寸发生改变的事件 resize
  $(window).on("resize", function () {
      render();
      /* 通过js 主动触发某个事件 */
    })
    .trigger("resize");

  /* 4. 手势切换 */
  var startX = 0
  var distanceX = 0
  var isMove = false

  /* originalEvent 代表js原始事件 */
  $(".wjs_banner")
    .on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX
        console.log(startX)
    })
    .on("touchmove", function (e) {
        var moveX = e.originalEvent.touches[0].clientX
        distanceX  = moveX - startX
        isMove = true

    })
    .on("touchend", function (e) {
        /* 距离足够 50px 一定要滑动过 */
        if (isMove && Math.abs(distanceX)>50) {
            /* 手势 */
            /* 左滑手势 */
            if (distanceX < 0) {
                // console.log('next')
                $("#carousel-example-generic").carousel('next')
            }
            /* 右滑手势 */
            else{
                // console.log('prev')
                $("#carousel-example-generic").carousel('prev')
            }
        }

        // 重置属性值
        startX = 0
        distanceX = 0
        isMove = false

    });
};
