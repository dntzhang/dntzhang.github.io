/// <reference path="pe.js" />
var pw = {};
; (function (pw) {
    var Uploader = function (option) {
        this.dragTo = typeof option.dragTo == "string" ? document.getElementById(option.dragTo) : option.dragTo;
        this.complete = option.complete;
        this.dragover = option.dragover;

        this.init();
    }

    Uploader.prototype = {
        init: function () {
            var self = this;
            this.dragTo.addEventListener("dragover", function (e) {
                self.dragover&&self.dragover(e);
                e.preventDefault();
            }, true);
            this.dragTo.addEventListener("drop", function (e) {
              
                self.readImage(e.dataTransfer.files[0]);
                e.preventDefault();
            }, true);
        },
        readImage: function (imgFile) {
            if (!imgFile.type.match(/image.*/)) {
                console.log("The dropped file is not an image: ", imgFile.type);
                return;
            }
            var self = this;
            var reader = new FileReader();
            reader.onload = function (e) {
               
                self.initImage(e.target.result);
            };
            reader.readAsDataURL(imgFile);
        },
        initImage: function (src) {
            var self = this;
            var img = new Image();
            img.onload = function () {
                self.complete(this);
            };
            img.src = src;
        }
    }

    pw.Uploader = Uploader;
})(pw);