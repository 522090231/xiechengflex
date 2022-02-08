window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var index = 0;
    var flag = false;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';

        //注意:我们判断条件是要等到图片完成滚动后才能去判断
        //因此需要添加过渡完成事件 transitionend
    }, 2000); //这个时间不能写的比过渡时间要短,否则transitionend无效
    ul.addEventListener('transitionend', function() {
            if (index >= 3) {
                index = 0;
                translatex = -index * w;
                ul.style.transition = 'none';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else if (index < 0) {
                index = 2;
                ul.style.transition = 'none';
                // 利用最新的索引号乘以宽度 去滚动图片
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            ol.querySelector('.current').classList.remove('current');
            ol.children[index].classList.add('current');

        })
        //小圆点跟随变化

    //手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault();
        flag = true;
    })
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            if (moveX > 50) { //上一张
                index--;
            } else if (moveX < -50) { //下一张
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
            clearInterval(timer);
            var timer = setInterval(function() {
                index++;
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';

                //注意:我们判断条件是要等到图片完成滚动后才能去判断
                //因此需要添加过渡完成事件 transitionend
            }, 2000);
        }

    })

    //页面滚动
    var goBack = this.document.querySelector('.goBack');
    var nav = this.document.querySelector('nav');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})