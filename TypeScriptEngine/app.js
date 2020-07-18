var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///Vec2 Class///
var vec2 = /** @class */ (function () {
    function vec2(_x, _y) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        this.x = _x;
        this.y = _y;
    }
    return vec2;
}()); ///
////////////////
///GameWindow Class///
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
}()); ///
//////////////////////
///Time Class///
var Time = /** @class */ (function () {
    function Time() {
        var _this = this;
        this.CalcFPS = function () {
            if (!_this.lastCalledTime) {
                _this.lastCalledTime = performance.now();
                _this.FPS = 0;
                return;
            }
            _this.delta = (performance.now() - _this.lastCalledTime) / 1000;
            _this.lastCalledTime = performance.now();
            _this.FPS = Math.floor(1 / _this.delta);
        };
    }
    return Time;
}()); ///
////////////////
var Module = /** @class */ (function () {
    function Module() {
        this.Draw = function (_ctx) {
        };
        this.Awake = function (_engine) {
        };
        this.Update = function (_engine) {
        };
    }
    return Module;
}());
///Rectangle Class///
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(_x, _y, _width, _height, _lineWidth, _lineColour) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (_width === void 0) { _width = 50; }
        if (_height === void 0) { _height = 50; }
        if (_lineWidth === void 0) { _lineWidth = 2; }
        if (_lineColour === void 0) { _lineColour = "black"; }
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.width = 50;
        _this.height = 50;
        _this.lineWidth = 2;
        _this.lineColour = "black";
        //TODO: drawing needs to be relative to parent object
        _this.Draw = function (_ctx) {
            _ctx.save;
            _ctx.beginPath();
            _ctx.strokeStyle = _this.lineColour;
            _ctx.lineWidth = _this.lineWidth;
            _ctx.rect(_this.x, _this.y, _this.width, _this.height);
            _ctx.stroke();
            _ctx.restore();
        };
        _this.x = _x;
        _this.y = _y;
        _this.width = _width;
        _this.height = _height;
        _this.lineWidth = _lineWidth;
        _this.lineColour = _lineColour;
        return _this;
    }
    return Rectangle;
}(Module)); ///
/////////////////////
var GameObject = /** @class */ (function () {
    function GameObject(_pos, _scale) {
        var _this = this;
        this.modules = new Array();
        this.Transform = {
            pos: new vec2(0, 0),
            scale: new vec2(1, 1)
        };
        this.Awake = function () {
            for (var _i = 0, _a = _this.modules; _i < _a.length; _i++) {
                var mod = _a[_i];
                mod.Awake(engine);
            }
        };
        this.Update = function (ctx) {
            for (var _i = 0, _a = _this.modules; _i < _a.length; _i++) {
                var mod = _a[_i];
                mod.Update(engine);
                mod.Draw(ctx);
            }
        };
        this.Transform.pos = _pos;
        this.Transform.pos = _scale;
    }
    GameObject.prototype.AddModule = function (_mod) {
        this.modules.push(_mod);
    };
    return GameObject;
}());
var EngineObject = /** @class */ (function () {
    function EngineObject(_gameObject, _id) {
        var _this = this;
        //TODO: Remove if nothing else is added or leave if needed for support of child objects
        this.Update = function (ctx) {
            _this.gameObject.Update(ctx);
        };
        this.id = _id;
        this.gameObject = _gameObject;
    }
    return EngineObject;
}());
var Engine = /** @class */ (function () {
    function Engine(_gameWindow) {
        var _this = this;
        this.globalObjIdCount = 0;
        this.InitialiseEngine = function () {
            _this.time = new Time();
            _this.gameWindow.InitialiseCanvas();
            _this.gameObjects = new Array();
        };
        this.Update = function () {
            _this.time.CalcFPS();
            _this.Draw();
            for (var _i = 0, _a = _this.gameObjects; _i < _a.length; _i++) {
                var engineObj = _a[_i];
                engineObj.Update(_this.gameWindow.ctx);
            }
        };
        this.Draw = function () {
            _this.gameWindow.DrawCanvas();
        };
        this.Instantiate = function (_obj) {
            var newObj = new EngineObject(_obj, _this.globalObjIdCount);
            _this.gameObjects.push(newObj);
            _this.globalObjIdCount++;
        };
        this.Destroy = function (_id) {
            for (var i = 0; i < _this.gameObjects.length; i++) {
                if (_this.gameObjects[i].id == _id) {
                    _this.gameObjects.splice(i, 1);
                    break;
                }
            }
        };
        this.globalObjIdCount = 0;
        this.gameWindow = _gameWindow;
    }
    return Engine;
}());
var gameWindow = new GameWindow();
var engine = new Engine(gameWindow);
function GameLoop() {
    requestAnimationFrame(GameLoop);
    engine.Update();
}
window.onload = function () {
    engine.InitialiseEngine();
    InitialGameObjects();
    //Call each gameobjects Awake function
    for (var _i = 0, _a = engine.gameObjects; _i < _a.length; _i++) {
        var engineObj = _a[_i];
        engineObj.gameObject.Awake();
    }
    GameLoop();
};
function InitialGameObjects() {
    var rect = new Rectangle(10, 10, 200, 100, 2, "red");
    var rect2 = new Rectangle(50, 50, 80, 300, 2, "blue");
    var obj = new GameObject(new vec2(0, 0), new vec2(1, 1));
    obj.AddModule(rect);
    obj.AddModule(rect2);
    engine.Instantiate(obj);
}
//# sourceMappingURL=app.js.map