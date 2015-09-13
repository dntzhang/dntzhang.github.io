var ISelect = function (option) {
    this.options = option.options;
    this.parent = document.querySelector(option.renderTo);
    var lis = "";
    for (var i = 0, len = this.options.length; i < len; i++) {
        lis += '<li>' + this.options[i].text + '</li>'
    }
    this.html = ' <div class="iselect">\
                                <div class="iselect-toolbar"><a class="iselect-toolbar-ok">完成</a></div>\
                                <div class="iselect-options">\
                                    <ul class="iselect-scroll">'+ lis + ' </ul>\
                                    <div class="iselect-mask1"></div>\
                                    <div class="iselect-mask2"></div>\
                                </div>\
                            </div>';

    this.parent.insertAdjacentHTML("beforeEnd", this.html);

    var scroll = document.querySelector(".iselect-scroll"), warpper = document.querySelector(".iselect-options"), preY, logs = [], speed = 0, loop, step = 30, checkLoop, minTop = step * 2, maxTop = parseInt(window.getComputedStyle(scroll).height) - parseInt(window.getComputedStyle(warpper).height) + minTop;
    var minEaseTop = step *4, maxEaseTop = maxTop + 2 * step;
    warpper.addEventListener("touchmove", function (evt) {
        var dy = evt.touches[0].pageY - preY;
        preY = evt.touches[0].pageY;
        var positionY = (parseInt(window.getComputedStyle(scroll).top) + dy);
        if (positionY < minEaseTop && Math.abs( positionY)< maxEaseTop) {
            scroll.style.top = positionY + "px";
        }
        logs.unshift({ time: new Date().getTime(), y: preY });
        evt.preventDefault();
    }, false);

    warpper.addEventListener("touchstart", function (evt) {
        clearInterval(loop);
        clearInterval(checkLoop);
        logs.length = 0;
        preY = evt.touches[0].pageY;
        speed = 0;
        evt.preventDefault();
    }, false);

    //根据前两次touchmove坐标和时间，以及touchend的坐标和时间，来决定滚动方向和速度
    warpper.addEventListener("touchend", function (evt) {
        var now = new Date().getTime();
        var y = evt.changedTouches[0].pageY;
        if (logs.length > 1) {
            // if (now - logs[0].time < 500) {
            speed = 1000 * (logs[0].y - logs[1].y) / (logs[0].time - logs[1].time) / 60;
            initLoop();
            //  }else{
            //   checkEnd();
            //  }
        }
        evt.preventDefault();
    }, false);

    function initLoop() {
        loop = setInterval(function () {
            var positionY = (parseInt(window.getComputedStyle(scroll).top) + speed);
            if (positionY <= minEaseTop && Math.abs(positionY) < maxEaseTop) {
                scroll.style.top = positionY + "px";
            }
            speed /= 1.1;
            if (Math.abs(speed) < 0.1) {
                clearInterval(loop);
                checkEnd();
            }
        }, 16)
    }

    function checkEnd() {
        var positionY = parseInt(window.getComputedStyle(scroll).top);
        if (positionY > minTop) {
            toTop(scroll, (positionY < 0 ? -1 : 1) * minTop, 100);
            return;
        }
        if (Math.abs(positionY) > maxTop) {
            toTop(scroll, (positionY < 0 ? -1 : 1) * maxTop, 100);
            return;
        }
        var rpt = Math.floor(Math.abs(positionY / step));
        var dy = positionY % step;
        if (Math.abs(dy) > step / 2) {
            toTop(scroll, (positionY < 0 ? -1 : 1) * (rpt + 1) * step, 100);
            // scroll.style.top = -1*(rpt+1)*step + "px";
        } else {
            toTop(scroll, (positionY < 0 ? -1 : 1) * rpt * step, 100);
            //scroll.style.top = -1*rpt*step + "px";
        }
    }

    function toTop(el, top, time) {
        var dTop = top - parseInt(window.getComputedStyle(scroll).top);
        var current = parseInt(window.getComputedStyle(scroll).top);
        var start = new Date();
        checkLoop = setInterval(function () {
            var dt = new Date() - start;
            if (dt >= time) {
                clearInterval(checkLoop);
                el.style.top = top + 'px';
                return;
            }
            var val = dTop *iosEase( dt / time) + current;
            el.style.top = val + 'px';
        }, 16);


    }
    //http://kmdjs.github.io/dnt/demo43/index.html
    function iosEase(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }
}
