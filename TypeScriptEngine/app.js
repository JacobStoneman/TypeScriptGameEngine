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
        if (_bkColour === void 0) { _bkColour = "lightGrey"; }
        this.windowHeight = 720;
        this.windowWidth = 1280;
        this.bkColour = "lightGrey";
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
///Prefab Class///
var Prefab = /** @class */ (function () {
    function Prefab(_pos, _scale) {
        var _this = this;
        this.modules = new Array();
        this.Transform = {
            pos: new vec2(0, 0),
            scale: new vec2(1, 1)
        };
        this.AddModule = function (_mod) {
            //TODO: dont allow modules to be added if label already exists
            _this.modules.push(_mod);
        };
        this.RemoveModule = function (_label) {
            for (var i = 0; i < _this.modules.length; i++) {
                if (_this.modules[i].label == _label) {
                    _this.modules.splice(i, 1);
                    break;
                }
            }
        };
        this.Awake = function () {
            for (var _i = 0, _a = _this.modules; _i < _a.length; _i++) {
                var mod = _a[_i];
                mod.Awake(engine, _this);
            }
        };
        this.Update = function (ctx) {
            for (var _i = 0, _a = _this.modules; _i < _a.length; _i++) {
                var mod = _a[_i];
                if (mod.active) {
                    mod.Update(engine, _this, ctx);
                }
            }
        };
        this.Transform.pos = _pos;
        this.Transform.scale = _scale;
    }
    return Prefab;
}()); ///
//////////////////
/*
    ___  ___          _       _
    |  \/  |         | |     | |
    | .  . | ___   __| |_   _| | ___  ___
    | |\/| |/ _ \ / _` | | | | |/ _ \/ __|
    | |  | | (_) | (_| | |_| | |  __/\__ \
    \_|  |_/\___/ \__,_|\__,_|_|\___||___/
 */
///Module Class///
var Module = /** @class */ (function () {
    function Module(_label) {
        this.Awake = function (_engine, _obj) {
        };
        this.Update = function (_engine, _obj, _ctx) {
        };
        this.active = true;
        this.label = _label;
    }
    return Module;
}()); ///
//////////////////
///Rectangle Module//////////////////
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(_label, _x, _y, _width, _height, _lineWidth, _lineColour, _isFilled, _fillColour) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (_width === void 0) { _width = 50; }
        if (_height === void 0) { _height = 50; }
        if (_lineWidth === void 0) { _lineWidth = 2; }
        if (_lineColour === void 0) { _lineColour = "black"; }
        if (_isFilled === void 0) { _isFilled = true; }
        if (_fillColour === void 0) { _fillColour = "white"; }
        var _this = _super.call(this, _label) || this;
        _this.x = 0;
        _this.y = 0;
        _this.width = 50;
        _this.height = 50;
        _this.lineWidth = 2;
        _this.lineColour = "black";
        _this.fillColour = "white";
        _this.isFilled = true;
        _this.Update = function (_engine, _obj, _ctx) {
            _this.Draw(_ctx, _obj);
        };
        _this.Draw = function (_ctx, _obj) {
            _ctx.save;
            _ctx.beginPath();
            _ctx.strokeStyle = _this.lineColour;
            _ctx.lineWidth = _this.lineWidth;
            if (_this.isFilled) {
                _ctx.fillStyle = _this.fillColour;
                _ctx.fillRect(_obj.Transform.pos.x + _this.x, _obj.Transform.pos.y + _this.y, _obj.Transform.scale.x * _this.width, _obj.Transform.scale.y * _this.height);
            }
            else {
                _ctx.rect(_obj.Transform.pos.x + _this.x, _obj.Transform.pos.y + _this.y, _obj.Transform.scale.x * _this.width, _obj.Transform.scale.y * _this.height);
            }
            _ctx.stroke();
            _ctx.restore();
        };
        _this.x = _x;
        _this.y = _y;
        _this.width = _width;
        _this.height = _height;
        _this.lineWidth = _lineWidth;
        _this.lineColour = _lineColour;
        _this.fillColour = _fillColour;
        _this.isFilled = _isFilled;
        return _this;
    }
    return Rectangle;
}(Module)); ///
////////////////////////////////////
///Circle Module//////////////////
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(_label, _x, _y, _radius, _lineWidth, _lineColour, _isFilled, _fillColour) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (_radius === void 0) { _radius = 50; }
        if (_lineWidth === void 0) { _lineWidth = 2; }
        if (_lineColour === void 0) { _lineColour = "black"; }
        if (_isFilled === void 0) { _isFilled = true; }
        if (_fillColour === void 0) { _fillColour = "white"; }
        var _this = _super.call(this, _label) || this;
        _this.x = 0;
        _this.y = 0;
        _this.radius = 50;
        _this.lineWidth = 2;
        _this.lineColour = "black";
        _this.fillColour = "white";
        _this.isFilled = true;
        _this.Update = function (_engine, _obj, _ctx) {
            _this.Draw(_ctx, _obj);
        };
        //TODO: scale probably should use y as well
        _this.Draw = function (_ctx, _obj) {
            _ctx.save;
            _ctx.beginPath();
            _ctx.strokeStyle = _this.lineColour;
            _ctx.lineWidth = _this.lineWidth;
            _ctx.arc(_obj.Transform.pos.x + _this.x, _obj.Transform.pos.y + _this.y, _obj.Transform.scale.x * _this.radius, 0, 2 * Math.PI);
            if (_this.isFilled) {
                _ctx.fillStyle = _this.fillColour;
                _ctx.fill();
            }
            _ctx.stroke();
            _ctx.restore();
        };
        _this.x = _x;
        _this.y = _y;
        _this.radius = _radius;
        _this.lineWidth = _lineWidth;
        _this.lineColour = _lineColour;
        _this.fillColour = _fillColour;
        _this.isFilled = _isFilled;
        return _this;
    }
    return Circle;
}(Module)); ///
////////////////////////////////////
///Polygon Module//////////////////
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(_label, _x, _y, _pointList, _lineWidth, _lineColour, _isFilled, _fillColour) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        if (_lineWidth === void 0) { _lineWidth = 2; }
        if (_lineColour === void 0) { _lineColour = "black"; }
        if (_isFilled === void 0) { _isFilled = true; }
        if (_fillColour === void 0) { _fillColour = "white"; }
        var _this = _super.call(this, _label) || this;
        _this.x = 0;
        _this.y = 0;
        _this.lineWidth = 2;
        _this.lineColour = "black";
        _this.fillColour = "white";
        _this.isFilled = true;
        _this.pointList = new Array();
        _this.Update = function (_engine, _obj, _ctx) {
            _this.Draw(_ctx, _obj);
        };
        _this.Draw = function (_ctx, _obj) {
            _ctx.save;
            _ctx.beginPath();
            _ctx.strokeStyle = _this.lineColour;
            _ctx.lineWidth = _this.lineWidth;
            _ctx.moveTo(_obj.Transform.pos.x + _this.x + _this.pointList[_this.pointList.length - 1].x, _obj.Transform.pos.y + _this.y + _this.pointList[_this.pointList.length - 1].y);
            for (var i = 0; i < _this.pointList.length; i++) {
                _ctx.lineTo(_obj.Transform.pos.x + _this.x + _this.pointList[i].x, _obj.Transform.pos.y + _this.y + _this.pointList[i].y);
            }
            if (_this.isFilled) {
                _ctx.fillStyle = _this.fillColour;
                _ctx.fill();
            }
            _ctx.closePath();
            _ctx.stroke();
            _ctx.restore();
        };
        _this.x = _x;
        _this.y = _y;
        _this.pointList = _pointList;
        _this.lineWidth = _lineWidth;
        _this.lineColour = _lineColour;
        _this.fillColour = _fillColour;
        _this.isFilled = _isFilled;
        return _this;
    }
    return Polygon;
}(Module)); ///
////////////////////////////////////
var GameObject = /** @class */ (function () {
    function GameObject(_gameObject, _id) {
        var _this = this;
        //TODO: Remove if nothing else is added or leave if needed for support of child objects
        this.Update = function (ctx) {
            _this.gameObject.Update(ctx);
        };
        this.id = _id;
        this.gameObject = _gameObject;
    }
    return GameObject;
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
            var newObj = new GameObject(_obj, _this.globalObjIdCount);
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
//Main GameLoop Function//
function GameLoop() {
    requestAnimationFrame(GameLoop);
    engine.Update();
} ///
/////////////////////////
window.onload = function () {
    engine.InitialiseEngine();
    CreateInitialGameObjects();
    //Call each gameobjects Awake function
    for (var _i = 0, _a = engine.gameObjects; _i < _a.length; _i++) {
        var engineObj = _a[_i];
        engineObj.gameObject.Awake();
    }
    GameLoop();
};
function pTestPrefab() {
    //Basic game object with 2 rectangles and a circle
    var rect = new Rectangle("rect", 10, 10, 200, 100, 2, "red", false);
    var rect2 = new Rectangle("rect2", 50, 50, 80, 300, 2, "blue", true, "green");
    var circ = new Circle("circ", 20, 60, 50, 5, "black", true, "orange");
    var pointList = new Array();
    var p1 = new vec2(10, 50);
    var p2 = new vec2(60, 30);
    var p3 = new vec2(20, 10);
    var p4 = new vec2(90, 70);
    pointList.push(p1);
    pointList.push(p3);
    pointList.push(p2);
    pointList.push(p4);
    var poly = new Polygon("poly", 20, 60, pointList, 3, "black", true, "blue");
    var obj = new Prefab(new vec2(0, 0), new vec2(1, 1));
    obj.AddModule(rect);
    obj.AddModule(rect2);
    obj.AddModule(circ);
    obj.AddModule(poly);
    return obj;
}
//Any game objects that should exist on launch should be declared here
function CreateInitialGameObjects() {
    //A game object can be created from a prefab by calling the prefab declaration directly
    //This will create it exactly how it is defined
    engine.Instantiate(pTestPrefab());
    //Or it can be created through the prefab function then modified before being instantiated
    var otherTwoRect = pTestPrefab();
    otherTwoRect.Transform.pos.x = 200;
    otherTwoRect.Transform.pos.y = 200;
    otherTwoRect.Transform.scale.x = 2;
    otherTwoRect.Transform.scale.y = 2;
    engine.Instantiate(otherTwoRect);
}
//# sourceMappingURL=app.js.map