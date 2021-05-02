;$(function () {
    /*手势 轮播图 */
    /* 1.自动轮播  无缝 */
    /* 2.点随着变化 */
    /* 3.完成手势切换 */

    var $banner = $('.sn_banner')
    var width = $banner.width()
    var $imageBox = $banner.find('ul:first')
    var $pointBox = $banner.find('ul:last')

    var $point = $pointBox.find('li')

    var animationFunc = function () {
        /* 动画 */
        $imageBox.animate({transform:'translateX('+(-index*width)+'px)'}, 200, function () {
         /* 动画执行完成的回调  */
         if (index>=9) {
            index = 1
            /* 瞬间 */
            $imageBox.css({transform:'translateX('+(-index*width)+'px)'})
         }else if(index <= 0){
            index = 8;
            /* 瞬间 */
            $imageBox.css({transform:'translateX('+(-index*width)+'px)'})
         }
         /* 1-8 */
         /* 2.点随着变化 (先清除所有的，  找到对应的，  将对应的设置样式)*/
         $point.removeClass('now').eq(index - 1).addClass('now')

        })

    }
    var index = 1
    // console.log($imageBox, $pointBox)
    /* 1.自动轮播 */


    var timer = setInterval(function () {
        index ++ 
        animationFunc()
    }, 5000)
    /* 3.完成手势切换(上滑下滑， swipeUp,swipeDown ) android 4.0需要兼容 */
    /* 左滑的手势  下一张 */
    $banner.on('swipeLeft', function () {
        // console.log('next')
        index++
        animationFunc()
    })

    /* 右滑的手势  上一张 */
    $banner.on('swipeRight', function () {
        // console.log('prev')
        index--
        animationFunc()
    })


})