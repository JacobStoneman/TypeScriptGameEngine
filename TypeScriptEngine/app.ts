///Vec2 Class///
class vec2 {
    x;
    y;
    constructor(_x:number= 0, _y:number =0) {
        this.x = _x;
        this.y = _y;
    }
}///
////////////////
///GameWindow Class///
class GameWindow {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    public windowHeight: number = 720;
    public windowWidth: number = 1280;

    public bkColour: string = "lightGrey";

    constructor(_windowHeight: number = 720, _windowWidth: number = 1280, _bkColour: string = "lightGrey") {
        this.windowHeight = _windowHeight;
        this.windowWidth = _windowWidth;
        this.bkColour = _bkColour;
    }

    public InitialiseCanvas = (): void => {
        this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = this.windowHeight;
        this.canvas.width = this.windowWidth;
    }

    public DrawCanvas = (): void => {
        this.ctx.fillStyle = this.bkColour;
        this.ctx.fillRect(0, 0, this.windowWidth, this.windowHeight);
    }
}///
//////////////////////
///Time Class///
class Time {
    public FPS: number;
    public delta: number;
    private lastCalledTime: number;

    public CalcFPS = (): void => {
        if (!this.lastCalledTime) {
            this.lastCalledTime = performance.now();
            this.FPS = 0;
            return;
        }
        this.delta = (performance.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = performance.now();
        this.FPS = Math.floor(1 / this.delta);
    }
}///
////////////////
///Prefab Class///
class Prefab {
    public modules: Array<Module> = new Array<Module>();

    public Transform = {
        pos: new vec2(0, 0),
        scale: new vec2(1,1)
    };

    constructor(_pos: vec2, _scale: vec2) {
        this.Transform.pos = _pos;
        this.Transform.scale = _scale;
    }

    public AddModule = (_mod: Module): void => {
        //TODO: dont allow modules to be added if label already exists
        this.modules.push(_mod);
    }

    public RemoveModule = (_label: string): void => {
        for (let i = 0; i < this.modules.length; i++) {
            if (this.modules[i].label == _label) {
                this.modules.splice(i, 1);
                break;
            }
        }
    }

    public Awake = (): void => {
        for (let mod of this.modules) {
            mod.Awake(engine,this);
        }
    }

    public Update = (ctx): void => {
        for (let mod of this.modules) {
            if (mod.active) {
                mod.Update(engine,this,ctx);
            }
        }
    }
}///
//////////////////

//Globals/////////////////
let mouseX: number = 0;///
let mouseY: number = 0;///
//////////////////////////

///Tracks Mouse Events/////////////////////////////////////
document.addEventListener('mousemove', OnMouseUpdate, false);
document.addEventListener('mouseenter', OnMouseUpdate, false);
document.addEventListener('mousedown', OnMouseDown, false);
document.addEventListener('mouseup', OnMouseUp, false);

function OnMouseDown(e) {
    engine.OnMouseDown();
}
function OnMouseUp(e) {
    engine.OnMouseUp();
}
function OnMouseUpdate(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}
/////////////////////////////////////////////////////////////


/* 
    ___  ___          _       _
    |  \/  |         | |     | |
    | .  . | ___   __| |_   _| | ___  ___
    | |\/| |/ _ \ / _` | | | | |/ _ \/ __|
    | |  | | (_) | (_| | |_| | |  __/\__ \
    \_|  |_/\___/ \__,_|\__,_|_|\___||___/
 */

///Module Class////////////////
///Parent of all module tpyes//
class Module {
    label: string;
    active: boolean;

    constructor(_label: string) {
        this.active = true;
        this.label = _label;
    }
    public OnMouseDown = (_engine: Engine, _obj: Prefab): void => {
    }
    public OnMouseUp = (_engine: Engine, _obj: Prefab): void => {
    }
    public Awake = (_engine: Engine, _obj: Prefab): void => {
    }
    public Update = (_engine: Engine, _obj: Prefab, _ctx): void => {
    }
}///////////////
//////////////////////////////

///Rectangle Module/////////////////
///Renders basic rectangle//////////
class Rectangle extends Module{
    public x: number = 0;
    public y: number = 0;
    public width: number = 50;
    public height: number = 50;
    public lineWidth: number = 2;
    public lineColour: string = "black";
    public fillColour: string = "white";
    public isFilled: boolean = true;

    constructor(_label: string, _x: number = 0, _y: number = 0, _width: number = 50, _height: number = 50, _lineWidth: number = 2, _lineColour: string = "black", _isFilled: boolean = true, _fillColour: string = "white") {
        super(_label);
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.lineWidth = _lineWidth;
        this.lineColour = _lineColour;
        this.fillColour = _fillColour;
        this.isFilled = _isFilled;
    }

    public Update = (_engine: Engine, _obj: Prefab,_ctx): void => {
        this.Draw(_ctx, _obj);
    }

    private Draw = (_ctx: CanvasRenderingContext2D, _obj: Prefab): void => {
        _ctx.save;
        _ctx.beginPath();
        _ctx.strokeStyle = this.lineColour;
        _ctx.lineWidth = this.lineWidth;
        if (this.isFilled) {
            _ctx.fillStyle = this.fillColour;
            _ctx.fillRect(_obj.Transform.pos.x + this.x - ((this.width / 2) * _obj.Transform.scale.x), _obj.Transform.pos.y + this.y - ((this.height / 2) * _obj.Transform.scale.y), _obj.Transform.scale.x * this.width, _obj.Transform.scale.y * this.height);
        } else {
            _ctx.rect(_obj.Transform.pos.x + this.x - ((this.width / 2) * _obj.Transform.scale.x), _obj.Transform.pos.y + this.y - ((this.height / 2) * _obj.Transform.scale.y), _obj.Transform.scale.x * this.width, _obj.Transform.scale.y * this.height);
        }
        _ctx.stroke();
        _ctx.restore();
    }
}//
///////////////////////////////////

///Circle Module////////////////
///Renders basic circle/////////
class Circle extends Module {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 50;
    public lineWidth: number = 2;
    public lineColour: string = "black";
    public fillColour: string = "white";
    public isFilled: boolean = true;

    constructor(_label: string, _x: number = 0, _y: number = 0,_radius: number = 50, _lineWidth: number = 2, _lineColour: string = "black", _isFilled: boolean = true, _fillColour: string = "white") {
        super(_label);
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.lineWidth = _lineWidth;
        this.lineColour = _lineColour;
        this.fillColour = _fillColour;
        this.isFilled = _isFilled;
    }

    public Update = (_engine: Engine, _obj: Prefab, _ctx): void => {
        this.Draw(_ctx, _obj);
    }

    //TODO: scale probably should use y as well
    private Draw = (_ctx: CanvasRenderingContext2D, _obj: Prefab): void => {
        _ctx.save;
        _ctx.beginPath();
        _ctx.strokeStyle = this.lineColour;
        _ctx.lineWidth = this.lineWidth;
        _ctx.arc(_obj.Transform.pos.x + this.x, _obj.Transform.pos.y + this.y, _obj.Transform.scale.x * this.radius, 0, 2 * Math.PI);
        if (this.isFilled) {
            _ctx.fillStyle = this.fillColour;
            _ctx.fill();
        }
        _ctx.stroke();
        _ctx.restore();
    }
}//
////////////////////////////////

///Polygon Module/////////////////////
///Renders polygon of defined points//
class Polygon extends Module {
    public x: number = 0;
    public y: number = 0;
    public lineWidth: number = 2;
    public lineColour: string = "black";
    public fillColour: string = "white";
    public isFilled: boolean = true;
    public pointList: Array<vec2> = new Array<vec2>();

    constructor(_label: string, _x: number = 0, _y: number = 0, _pointList: Array<vec2>, _lineWidth: number = 2, _lineColour: string = "black", _isFilled: boolean = true, _fillColour: string = "white") {
        super(_label);
        this.x = _x;
        this.y = _y;
        this.pointList = _pointList;
        this.lineWidth = _lineWidth;
        this.lineColour = _lineColour;
        this.fillColour = _fillColour;
        this.isFilled = _isFilled;
    }

    public Update = (_engine: Engine, _obj: Prefab, _ctx): void => {
        this.Draw(_ctx, _obj);
    }

    private Draw = (_ctx: CanvasRenderingContext2D, _obj: Prefab): void => {
        _ctx.save;
        _ctx.beginPath();
        _ctx.strokeStyle = this.lineColour;
        _ctx.lineWidth = this.lineWidth;

        _ctx.moveTo(_obj.Transform.pos.x + this.x + this.pointList[this.pointList.length - 1].x, _obj.Transform.pos.y +this.y + this.pointList[this.pointList.length - 1].y);
        for (let i = 0; i < this.pointList.length; i++) {
            _ctx.lineTo(_obj.Transform.pos.x + this.x + this.pointList[i].x, _obj.Transform.pos.y + this.y + this.pointList[i].y)
        }

        if (this.isFilled) {
            _ctx.fillStyle = this.fillColour;
            _ctx.fill();
        }

        _ctx.closePath();
        _ctx.stroke();
        _ctx.restore();
    }
}//////
/////////////////////////////////////

///Follow Mouse Module//////////////////////////
///Sets game objects transform to mouse coords//
class FollowMouse extends Module {
    public Update = (_engine: Engine, _obj: Prefab, _ctx): void => {
        _obj.Transform.pos.x = mouseX;
        _obj.Transform.pos.y = mouseY;
    }
}/////////////
////////////////////////////////////////////////

///Move On Click Module/////////////////////////
///Teleports object to mouse position on click//
class MoveOnClick extends Module {
    public OnMouseDown = (_engine: Engine, _obj: Prefab): void => {
        _obj.Transform.pos.x = mouseX;
        _obj.Transform.pos.y = mouseY;
    }
}/////////////
////////////////////////////////////////////////

class GameObject {
    readonly id;
    public gameObject: Prefab;
    constructor(_gameObject: Prefab, _id: number) {
        this.id = _id;
        this.gameObject = _gameObject;
    }

    public OnMouseDown = (_engine: Engine): void => {
        for (let mod of this.gameObject.modules) {
            mod.OnMouseDown(_engine, this.gameObject);
        }
    }
    public OnMouseUp = (_engine: Engine): void => {
        for (let mod of this.gameObject.modules) {
            mod.OnMouseUp(_engine, this.gameObject);
        }
    }

    //TODO: Gameobject may need an awake function
    //TODO: Remove if nothing else is added or leave if needed for support of child objects
    public Update = (ctx): void => {
        this.gameObject.Update(ctx);
    }
}

class Engine {
    private globalObjIdCount: number = 0;

    public gameWindow: GameWindow;
    public time: Time;

    public gameObjects: Array<GameObject>;

    constructor(_gameWindow) {
        this.globalObjIdCount = 0;
        this.gameWindow = _gameWindow;
    }

    public InitialiseEngine = (): void => {      
        this.time = new Time();
        this.gameWindow.InitialiseCanvas();
        this.gameObjects = new Array<GameObject>();
    }

    public OnMouseDown = (): void => {
        for (let obj of this.gameObjects) {
            obj.OnMouseDown(this);
        }
    }
    public OnMouseUp = (): void => {
        for (let obj of this.gameObjects) {
            obj.OnMouseUp(this);
        }
    }

    public Update = (): void => {
        this.time.CalcFPS();
        this.Draw();
        for (let engineObj of this.gameObjects) {
            engineObj.Update(this.gameWindow.ctx);
        }
    }

    private Draw = (): void => {
        this.gameWindow.DrawCanvas();
    }

    public Instantiate = (_obj: Prefab): void => {

        let newObj = new GameObject(_obj, this.globalObjIdCount)
        this.gameObjects.push(newObj);

        this.globalObjIdCount++;
    }

    public Destroy = (_id: number): void => {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].id == _id) {
                this.gameObjects.splice(i, 1);
                break;
            }
        }
    }
}

var gameWindow: GameWindow = new GameWindow();
var engine: Engine = new Engine(gameWindow);

//Main GameLoop Function//
function GameLoop() {
    requestAnimationFrame(GameLoop);
    engine.Update();
}///
/////////////////////////

window.onload = () => {
    engine.InitialiseEngine();
    CreateInitialGameObjects();

    //Call each gameobjects Awake function
    for (let engineObj of engine.gameObjects) {
        engineObj.gameObject.Awake();
    }

    GameLoop();
};

function pTestPrefab (): Prefab {
    //Basic game object with 2 rectangles and a circle
    let rect: Rectangle = new Rectangle("rect", 0, 0, 200, 100, 2, "red",true);
    let rect2: Rectangle = new Rectangle("rect2", 50, 50, 80, 300, 2, "blue", true, "green");
    let circ: Circle = new Circle("circ", 0, 0, 50, 5, "black", true, "orange");

    let pointList = new Array<vec2>();
    let p1 = new vec2(10, 50);
    let p2 = new vec2(60, 30);
    let p3 = new vec2(20, 10);
    let p4 = new vec2(90, 70);
    pointList.push(p1);
    pointList.push(p3);
    pointList.push(p2);
    pointList.push(p4);
    let poly: Polygon = new Polygon("poly", 20, 60, pointList, 3, "black", true, "blue");

    var obj: Prefab = new Prefab(new vec2(50, 50), new vec2(1, 1));
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
    let otherTwoRect = pTestPrefab();
    otherTwoRect.Transform.pos.x = engine.gameWindow.windowWidth/2;
    otherTwoRect.Transform.pos.y = engine.gameWindow.windowHeight / 2;
    otherTwoRect.Transform.scale.x = 2;
    otherTwoRect.Transform.scale.y = 2;
    engine.Instantiate(otherTwoRect);
}