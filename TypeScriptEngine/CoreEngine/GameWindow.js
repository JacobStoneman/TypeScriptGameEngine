"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameWindow = /** @class */ (function () {
    function GameWindow(_windowHeight, _windowWidth, _bkColour) {
        var _this = this;
        if (_windowHeight === void 0) { _windowHeight = 720; }
        if (_windowWidth === void 0) { _windowWidth = 1280; }
        if (_bkColour === void 0) { _bkColour = "grey"; }
        this.windowHeight = 720;
        this.windowWidth = 1280;
        this.bkColour = "grey";
        this.InitialiseCanvas = function () {
            _this.canvas = document.getElementById('cnvs');
            _this.ctx = _this.canvas.getContext("2d");
            _this.canvas.height = _this.windowHeight;
            _this.canvas.width = _this.windowWidth;
        };
        this.DrawCanvas = function () {
            _this.ctx.fillStyle = _this.bkColour;
            _this.ctx.fillRect(0, 0, _this.windowWidth, _this.windowHeight);
        };
        this.windowHeight = _windowHeight;
        this.windowWidth = _windowWidth;
        this.bkColour = _bkColour;
    }
    return GameWindow;
}());
exports.GameWindow = GameWindow;
//# sourceMappingURL=GameWindow.js.map