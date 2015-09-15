var ISelect = function (option) {
    var options = option.options,
        lis = "",
        parent = document.body,
        i = 0,
        len = options.length,
        preSelectedIndex = option.selectedIndex;
    for (; i < len; i++) {
        lis += '<li>' + options[i].text + '</li>'
    }
    parent.insertAdjacentHTML("beforeEnd",
                        ' <div class="iselect">\
                                <div class="iselect-toolbar"><a class="iselect-toolbar-ok">完成</a></div>\
                                <div class="iselect-options">\
                                    <ul class="iselect-scroll">'+ lis + ' </ul>\
                                    <div class="iselect-mask1"></div>\
                                    <div class="iselect-mask2"></div>\
                                </div>\
                            </div>');
    
    var container = parent.querySelectorAll(".iselect")[0],
        scroll = container.querySelector(".iselect-scroll"),
        warpper = container.querySelector(".iselect-options"),
        okBtn = container.querySelector(".iselect-toolbar-ok"),
        preY,
        logs = [],
        speed = 0,
        loop,
        step = 30,
        checkLoop,
        minTop = step * 2,
        fx = 1.1,
        maxTop = parseInt(window.getComputedStyle(scroll).height) - parseInt(window.getComputedStyle(warpper).height) + minTop,
        minEaseTop = step * 4,
        maxEaseTop = maxTop + 2 * step;
    css(scroll, 'top',2 * step - option.selectedIndex * step);

    okBtn.addEventListener("click", function () {
        this.hide();
        var index = getSelectedIndex();
        if (index !== preSelectedIndex) {
            option.change && option.change.call(this, option.options[index], index);
            preSelectedIndex = index;
        }
        option.complete&&option.complete.call(this, option.options[index], index);
    }.bind(this), false);

    warpper.addEventListener("touchmove", function (evt) {
        var dy = evt.touches[0].pageY - preY;
        preY = evt.touches[0].pageY;
        var positionY = (parseFloat(scroll.style.top) + dy);
        if (positionY < minEaseTop && Math.abs(positionY) < maxEaseTop) {
            css(scroll, 'top',positionY);
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

    warpper.addEventListener("touchcancel", function (evt) {
        alert("warppertouchcancel")
    }, false);
    document.addEventListener("touchcancel", function (evt) {
        alert("documenttouchcancel")
    }, false);
    document.addEventListener("touchend", function (evt) {
        alert("documenttouchend")
    }, false);
    
    //根据前两次touchmove坐标和时间，以及touchend的坐标和时间，来决定滚动方向和速度
    warpper.addEventListener("touchend", function (evt) {
        var positionY = parseInt(scroll.style.top);
        if (positionY > minTop) {
            to(scroll, 'top', (positionY < 0 ? -1 : 1) * minTop, 400);
            return;
        }
        if (Math.abs(positionY) > maxTop) {
            to(scroll, 'top', (positionY < 0 ? -1 : 1) * maxTop, 400);
            return;
        }
        var now = new Date().getTime();
        var y = evt.changedTouches[0].pageY;
        if (logs.length > 1) {
            // if (now - logs[0].time < 500) {
            speed = 1000 * (logs[0].y - logs[1].y) / (logs[0].time - logs[1].time) / 60;
            if (Math.abs(speed) > 30) speed = (speed < 0 ? -1 : 1) * 30;
            initLoop();
            //  }else{
            //     correction();
            //  }
        }
        evt.preventDefault();
    }, false);

    function initLoop() {
        loop = setInterval(function () {
            var positionY = (parseInt(scroll.style.top) + speed);
            if (positionY <= minEaseTop && Math.abs(positionY) < maxEaseTop) {
                css(scroll,'top', positionY);
            }
            if (positionY > minTop || Math.abs(positionY) > maxTop) {
                //当超出上下边界，摩擦力大一些
                fx = 2;
            } else {
                fx = 1.1;
            }
            speed /= fx;
            if (Math.abs(speed) < 0.1) {
                clearInterval(loop);
                correction();
            }
        }, 16)
    }

    function correction() {
        var positionY = parseInt(scroll.style.top);
        if (positionY > minTop) {
            to(scroll,'top', (positionY < 0 ? -1 : 1) * minTop, 400);
            return;
        }
        if (Math.abs(positionY) > maxTop) {
            to(scroll, 'top', (positionY < 0 ? -1 : 1) * maxTop, 400);
            return;
        }
        var rpt = Math.floor(Math.abs(positionY / step));
        var dy = positionY % step;
        if (Math.abs(dy) > step / 2) {
            to(scroll, 'top', (positionY < 0 ? -1 : 1) * (rpt + 1) * step, 400);
            // scroll.style.top = -1*(rpt+1)*step + "px";
        } else {
            to(scroll, 'top', (positionY < 0 ? -1 : 1) * rpt * step, 400);
            //scroll.style.top = -1*rpt*step + "px";
        }
    }

    function to(el, name, value, time, callback) {
        var current = parseInt(window.getComputedStyle(el)[name]);
        var dv = value - current;
        var start = new Date();
        checkLoop = setInterval(function () {
            var dt = new Date() - start;
            if (dt >= time) {
                clearInterval(checkLoop);
                css(el, name, value);
                callback&&callback();
                return;
            }
            var val = dv * iosEase(dt / time) + current;
            css(el,name, val);
        }, 16);


    }

    //http://kmdjs.github.io/dnt/demo43/index.html
    function iosEase(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }

    function css(element,name,value) {
        element.style[name] = value + "px";
    }

    function getSelectedIndex() {
        //60  30  0   -30   -60...   -300
       var rpt= (step*2- parseInt(window.getComputedStyle(scroll).top))/step;
       if (rpt < 0) return 0;
       if (rpt > option.options.length) return option.options.length - 1;
       return Math.round(rpt);
    }

    this.show = function () {
        clearInterval(loop);
        clearInterval(checkLoop);
        container.style.visibility = "visible";
        container.style.display = "block";
        to(container, 'bottom', 0, 400);
    }

    this.hide = function () {
        clearInterval(loop);
        clearInterval(checkLoop);
        to(container, 'bottom', -190, 400, function () {
            container.style.display = "none";
        });
    }
}
