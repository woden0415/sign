"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SmoothSignature = /*#__PURE__*/function () {
  function SmoothSignature(_canvas, options) {
    var _this = this;

    _classCallCheck(this, SmoothSignature);

    this.canvas = {};
    this.ctx = {};
    this.width = 320;
    this.height = 200;
    this.scale = window.devicePixelRatio || 1;
    this.color = 'black';
    this.bgColor = '';
    this.canDraw = false;
    this.openSmooth = true;
    this.minWidth = 2;
    this.maxWidth = 6;
    this.minSpeed = 1.5;
    this.maxWidthDiffRate = 20;
    this.points = [];
    this.canAddHistory = true;
    this.historyList = [];
    this.maxHistoryLength = 20;

    this.onStart = function () {};

    this.onEnd = function () {};

    this.addListener = function () {
      _this.removeListener();

      _this.canvas.style.touchAction = 'none';

      if ('ontouchstart' in window || navigator.maxTouchPoints) {
        _this.canvas.addEventListener('touchstart', _this.onDrawStart);

        _this.canvas.addEventListener('touchmove', _this.onDrawMove);

        document.addEventListener('touchcancel', _this.onDrawEnd);
        document.addEventListener('touchend', _this.onDrawEnd);
      } else {
        _this.canvas.addEventListener('mousedown', _this.onDrawStart);

        _this.canvas.addEventListener('mousemove', _this.onDrawMove);

        document.addEventListener('mouseup', _this.onDrawEnd);
      }
    };

    this.removeListener = function () {
      _this.canvas.style.touchAction = 'auto';

      _this.canvas.removeEventListener('touchstart', _this.onDrawStart);

      _this.canvas.removeEventListener('touchmove', _this.onDrawMove);

      document.removeEventListener('touchend', _this.onDrawEnd);
      document.removeEventListener('touchcancel', _this.onDrawEnd);

      _this.canvas.removeEventListener('mousedown', _this.onDrawStart);

      _this.canvas.removeEventListener('mousemove', _this.onDrawMove);

      document.removeEventListener('mouseup', _this.onDrawEnd);
    };

    this.onDrawStart = function (e) {
      e.preventDefault();
      _this.canDraw = true;
      _this.canAddHistory = true;
      _this.ctx.strokeStyle = _this.color;

      _this.initPoint(e);

      _this.onStart && _this.onStart(e);
    };

    this.onDrawMove = function (e) {
      e.preventDefault();
      if (!_this.canDraw) return;

      _this.initPoint(e);

      if (_this.points.length < 2) return;

      _this.addHistory();

      var point = _this.points.slice(-1)[0];

      var prePoint = _this.points.slice(-2, -1)[0];

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(function () {
          return _this.onDraw(prePoint, point);
        });
      } else {
        _this.onDraw(prePoint, point);
      }
    };

    this.onDraw = function (prePoint, point) {
      if (_this.openSmooth) {
        _this.drawSmoothLine(prePoint, point);
      } else {
        _this.drawNoSmoothLine(prePoint, point);
      }
    };

    this.onDrawEnd = function (e) {
      if (!_this.canDraw) return;
      _this.canDraw = false;
      _this.canAddHistory = true;
      _this.points = [];
      _this.onEnd && _this.onEnd(e);
    };

    this.getLineWidth = function (speed) {
      var minSpeed = _this.minSpeed > 10 ? 10 : _this.minSpeed < 1 ? 1 : _this.minSpeed;
      var addWidth = (_this.maxWidth - _this.minWidth) * speed / minSpeed;
      var lineWidth = Math.max(_this.maxWidth - addWidth, _this.minWidth);
      return Math.min(lineWidth, _this.maxWidth);
    };

    this.getRadianData = function (x1, y1, x2, y2) {
      var dis_x = x2 - x1;
      var dis_y = y2 - y1;

      if (dis_x === 0) {
        return {
          val: 0,
          pos: -1
        };
      }

      if (dis_y === 0) {
        return {
          val: 0,
          pos: 1
        };
      }

      var val = Math.abs(Math.atan(dis_y / dis_x));

      if (x2 > x1 && y2 < y1 || x2 < x1 && y2 > y1) {
        return {
          val: val,
          pos: 1
        };
      }

      return {
        val: val,
        pos: -1
      };
    };

    this.getRadianPoints = function (radianData, x, y, halfLineWidth) {
      if (radianData.val === 0) {
        if (radianData.pos === 1) {
          return [{
            x: x,
            y: y + halfLineWidth
          }, {
            x: x,
            y: y - halfLineWidth
          }];
        }

        return [{
          y: y,
          x: x + halfLineWidth
        }, {
          y: y,
          x: x - halfLineWidth
        }];
      }

      var dis_x = Math.sin(radianData.val) * halfLineWidth;
      var dis_y = Math.cos(radianData.val) * halfLineWidth;

      if (radianData.pos === 1) {
        return [{
          x: x + dis_x,
          y: y + dis_y
        }, {
          x: x - dis_x,
          y: y - dis_y
        }];
      }

      return [{
        x: x + dis_x,
        y: y - dis_y
      }, {
        x: x - dis_x,
        y: y + dis_y
      }];
    };

    this.initPoint = function (event) {
      var t = Date.now();

      var prePoint = _this.points.slice(-1)[0];

      if (prePoint && prePoint.t === t) {
        return;
      }

      var rect = _this.canvas.getBoundingClientRect();

      var e = event.touches && event.touches[0] || event;
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      if (prePoint && prePoint.x === x && prePoint.y === y) {
        return;
      }

      var point = {
        x: x,
        y: y,
        t: t
      };

      if (_this.openSmooth && prePoint) {
        var prePoint2 = _this.points.slice(-2, -1)[0];

        point.distance = Math.sqrt(Math.pow(point.x - prePoint.x, 2) + Math.pow(point.y - prePoint.y, 2));
        point.speed = point.distance / (point.t - prePoint.t || 0.1);
        point.lineWidth = _this.getLineWidth(point.speed);

        if (prePoint2 && prePoint2.lineWidth && prePoint.lineWidth) {
          var rate = (point.lineWidth - prePoint.lineWidth) / prePoint.lineWidth;
          var maxRate = _this.maxWidthDiffRate / 100;
          maxRate = maxRate > 1 ? 1 : maxRate < 0.01 ? 0.01 : maxRate;

          if (Math.abs(rate) > maxRate) {
            var per = rate > 0 ? maxRate : -maxRate;
            point.lineWidth = prePoint.lineWidth * (1 + per);
          }
        }
      }

      _this.points.push(point);

      _this.points = _this.points.slice(-3);
    };

    this.drawSmoothLine = function (prePoint, point) {
      var dis_x = point.x - prePoint.x;
      var dis_y = point.y - prePoint.y;

      if (Math.abs(dis_x) + Math.abs(dis_y) <= _this.scale) {
        point.lastX1 = point.lastX2 = prePoint.x + dis_x * 0.5;
        point.lastY1 = point.lastY2 = prePoint.y + dis_y * 0.5;
      } else {
        point.lastX1 = prePoint.x + dis_x * 0.3;
        point.lastY1 = prePoint.y + dis_y * 0.3;
        point.lastX2 = prePoint.x + dis_x * 0.7;
        point.lastY2 = prePoint.y + dis_y * 0.7;
      }

      point.perLineWidth = (prePoint.lineWidth + point.lineWidth) / 2;

      if (typeof prePoint.lastX1 === 'number') {
        _this.drawCurveLine(prePoint.lastX2, prePoint.lastY2, prePoint.x, prePoint.y, point.lastX1, point.lastY1, point.perLineWidth);

        if (prePoint.isFirstPoint) return;
        if (prePoint.lastX1 === prePoint.lastX2 && prePoint.lastY1 === prePoint.lastY2) return;

        var data = _this.getRadianData(prePoint.lastX1, prePoint.lastY1, prePoint.lastX2, prePoint.lastY2);

        var points1 = _this.getRadianPoints(data, prePoint.lastX1, prePoint.lastY1, prePoint.perLineWidth / 2);

        var points2 = _this.getRadianPoints(data, prePoint.lastX2, prePoint.lastY2, point.perLineWidth / 2);

        _this.drawTrapezoid(points1[0], points2[0], points2[1], points1[1]);
      } else {
        point.isFirstPoint = true;
      }
    };

    this.drawNoSmoothLine = function (prePoint, point) {
      point.lastX = prePoint.x + (point.x - prePoint.x) * 0.5;
      point.lastY = prePoint.y + (point.y - prePoint.y) * 0.5;

      if (typeof prePoint.lastX === 'number') {
        _this.drawCurveLine(prePoint.lastX, prePoint.lastY, prePoint.x, prePoint.y, point.lastX, point.lastY, _this.maxWidth);
      }
    };

    this.drawCurveLine = function (x1, y1, x2, y2, x3, y3, lineWidth) {
      _this.ctx.lineWidth = Number(lineWidth.toFixed(1));

      _this.ctx.beginPath();

      _this.ctx.moveTo(Number(x1.toFixed(1)), Number(y1.toFixed(1)));

      _this.ctx.quadraticCurveTo(Number(x2.toFixed(1)), Number(y2.toFixed(1)), Number(x3.toFixed(1)), Number(y3.toFixed(1)));

      _this.ctx.stroke();
    };

    this.drawTrapezoid = function (point1, point2, point3, point4) {
      _this.ctx.beginPath();

      _this.ctx.moveTo(Number(point1.x.toFixed(1)), Number(point1.y.toFixed(1)));

      _this.ctx.lineTo(Number(point2.x.toFixed(1)), Number(point2.y.toFixed(1)));

      _this.ctx.lineTo(Number(point3.x.toFixed(1)), Number(point3.y.toFixed(1)));

      _this.ctx.lineTo(Number(point4.x.toFixed(1)), Number(point4.y.toFixed(1)));

      _this.ctx.fillStyle = _this.color;

      _this.ctx.fill();
    };

    this.drawBgColor = function () {
      if (!_this.bgColor) return;
      _this.ctx.fillStyle = _this.bgColor;

      _this.ctx.fillRect(0, 0, _this.width, _this.height);
    };

    this.drawByImageUrl = function (url) {
      var image = new Image();

      image.onload = function () {
        _this.ctx.clearRect(0, 0, _this.width, _this.height);

        _this.ctx.drawImage(image, 0, 0, _this.width, _this.height);
      };

      image.crossOrigin = 'anonymous';
      image.src = url;
    };

    this.addHistory = function () {
      if (!_this.maxHistoryLength || !_this.canAddHistory) return;
      _this.canAddHistory = false;

      _this.historyList.push(_this.canvas.toDataURL());

      _this.historyList = _this.historyList.slice(-_this.maxHistoryLength);
    };

    this.clear = function () {
      _this.ctx.clearRect(0, 0, _this.width, _this.height);

      _this.drawBgColor();

      _this.historyList.length = 0;
    };

    this.undo = function () {
      var dataUrl = _this.historyList.splice(-1)[0];

      dataUrl && _this.drawByImageUrl(dataUrl);
    };

    this.toDataURL = function () {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image/png';
      var quality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (_this.canvas.width === _this.width) {
        return _this.canvas.toDataURL(type, quality);
      }

      var canvas = document.createElement('canvas');
      canvas.width = _this.width;
      canvas.height = _this.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(_this.canvas, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL(type, quality);
    };

    this.getPNG = function () {
      return _this.toDataURL();
    };

    this.getJPG = function () {
      var quality = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.8;
      return _this.toDataURL('image/jpeg', quality);
    };

    this.isEmpty = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = _this.canvas.width;
      canvas.height = _this.canvas.height;

      if (_this.bgColor) {
        ctx.fillStyle = _this.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (_this.scale !== 1) {
        ctx.scale(_this.scale, _this.scale);
      }

      return canvas.toDataURL() === _this.canvas.toDataURL();
    };

    this.getRotateCanvas = function () {
      var degree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;

      if (degree > 0) {
        degree = degree > 90 ? 180 : 90;
      } else {
        degree = degree < -90 ? 180 : -90;
      }

      var canvas = document.createElement('canvas');
      var w = _this.width;
      var h = _this.height;

      if (degree === 180) {
        canvas.width = w;
        canvas.height = h;
      } else {
        canvas.width = h;
        canvas.height = w;
      }

      var ctx = canvas.getContext('2d');
      ctx.rotate(degree * Math.PI / 180);

      if (degree === 90) {
        // 顺时针90度
        ctx.drawImage(_this.canvas, 0, -h, w, h);
      } else if (degree === -90) {
        // 逆时针90度
        ctx.drawImage(_this.canvas, -w, 0, w, h);
      } else if (degree === 180) {
        ctx.drawImage(_this.canvas, -w, -h, w, h);
      }

      return canvas;
    };

    this.init(_canvas, options);
  }

  _createClass(SmoothSignature, [{
    key: "init",
    value: function init(canvas) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!canvas) return;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = options.width || canvas.clientWidth || this.width;
      this.height = options.height || canvas.clientHeight || this.height;
      this.scale = options.scale || this.scale;
      this.color = options.color || this.color;
      this.bgColor = options.bgColor || this.bgColor;
      this.openSmooth = options.openSmooth === undefined ? this.openSmooth : !!options.openSmooth;
      this.minWidth = options.minWidth || this.minWidth;
      this.maxWidth = options.maxWidth || this.maxWidth;
      this.minSpeed = options.minSpeed || this.minSpeed;
      this.maxWidthDiffRate = options.maxWidthDiffRate || this.maxWidthDiffRate;
      this.maxHistoryLength = options.maxHistoryLength || this.maxHistoryLength;
      this.onStart = options.onStart;
      this.onEnd = options.onEnd;

      if (this.scale > 0) {
        this.canvas.height = this.height * this.scale;
        this.canvas.width = this.width * this.scale;

        if (this.scale !== 1) {
          this.canvas.style.width = this.width + 'px';
          this.canvas.style.height = this.height + 'px';
          this.ctx.scale(this.scale, this.scale);
        }
      }

      this.ctx.lineCap = 'round';
      this.drawBgColor();
      this.addListener();
    }
  }]);

  return SmoothSignature;
}();

// var _default = SmoothSignature;
// exports.default = _default;
export default SmoothSignature;