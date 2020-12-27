$(function () {
    /*动态轮播图*/
    banner()


});

var banner = function (){
    /*1.获取轮播图数据  ajax*/
    /*2.根据轮播图数据动态渲染, 根据当前设备  屏幕宽度判断 $.width(),选择大图小图 ,768px*/
    /*2.1 准备数据*/
    /*2.2 把数据转换成html 格式的字符串
    * (动态创建元素, 字符串拼接, 模板引擎 [art-template], 框架渲染)
    * */
    /*2.3 把字符串渲染页面当中*/

    /*3.测试功能*/

    /*ui框架: bootstrap, 妹子ui ,jqueryUi,easyUI,jqueryMobile, mui, framework7*/
    /*关于移动端UI框架: bootstrap, jqueryMobile, mui, framework7*/

    /*模板引擎:  art-template , handlebars, mustache, baiduTemplate, velocity,  underscore*/

    $.ajax({
        type: 'get',
        url: 'json/data.json',
        dataType: 'json', /*强制转换后台返回的数据 为 json 对象 */
        /*强制转换不成功程序报错,  不会执行success, 执行error 回调*/
        data: {},
        success: function (data) {// 回调函数
            // console.log(data)
            /*2.根据轮播图数据动态渲染, 根据当前设备  屏幕宽度判断 $.width(),选择大图小图 ,768px*/
            var isMobile = $(window).width()<768 ? true: false;
            console.log(data)
            /*2.2 把数据转换成html 格式的字符串*/
            /*使用模板引擎, 那些html静态内容需要变成动态的*/
            /*发现: 点容器  图片容器  新建模板*/
            /*开始使用*/
            /*<% console.log(list) %>   模板引擎内不可使用外部变量*/
            var ponitHtml = template('pointTemplate', {list :data})
            // console.log('ponitHtml', ponitHtml)
            var imageHtml = template('imageTemplate', {list :data, isM:isMobile})
            console.log('imageTemplate', imageHtml)

            /*2.3 把字符串渲染页面当中*/
            $('.carousel-indicators').html(ponitHtml)

            $('.carousel-inner').html(imageHtml)
        }
    })
}


