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

    public bkColour: string = "grey";

    constructor(_windowHeight: number = 720, _windowWidth: number = 1280, _bkColour: string = "grey") {
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

class Module {
    label: string;

    public Draw = (_ctx):void => {
    }
    public Awake = (_engine: Engine): void => {
    }
    public Update = (_engine: Engine): void => {
    }
}

///Rectangle Class///
class Rectangle extends Module {
    public x: number = 0;
    public y: number = 0;
    public width: number = 50;
    public height: number = 50;
    public lineWidth: number = 2;
    public lineColour: string = "black";
    constructor(_x: number = 0, _y: number = 0, _width: number = 50, _height: number = 50, _lineWidth: number = 2, _lineColour: string = "black") {
        super();
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.lineWidth = _lineWidth;
        this.lineColour = _lineColour;
    }
    //TODO: drawing needs to be relative to parent object
    public Draw = (_ctx): void => {
        _ctx.save;
        _ctx.beginPath();
        _ctx.strokeStyle = this.lineColour;
        _ctx.lineWidth = this.lineWidth;
        _ctx.rect(this.x, this.y, this.width, this.height);
        _ctx.stroke();
        _ctx.restore();
    }
}///
/////////////////////


class GameObject {
    public modules: Array<Module> = new Array<Module>();

    public Transform = {
        pos: new vec2(0, 0),
        scale: new vec2(1,1)
    };

    constructor(_pos: vec2, _scale: vec2) {
        this.Transform.pos = _pos;
        this.Transform.pos = _scale;
    }

    public AddModule(_mod: Module) {
        this.modules.push(_mod);
    }

    public Awake = (): void => {
        for (let mod of this.modules) {
            mod.Awake(engine);
        }
    }

    public Update = (ctx): void => {
        for (let mod of this.modules) {
            mod.Update(engine);
            mod.Draw(ctx);
        }
    }
}

class EngineObject {
    readonly id;
    public gameObject: GameObject;
    constructor(_gameObject: GameObject, _id: number) {
        this.id = _id;
        this.gameObject = _gameObject;
    }

    //TODO: Remove if nothing else is added or leave if needed for support of child objects
    public Update = (ctx): void => {
        this.gameObject.Update(ctx);
    }
}

class Engine {
    private globalObjIdCount: number = 0;

    public gameWindow: GameWindow;
    public time: Time;

    public gameObjects: Array<EngineObject>;

    constructor(_gameWindow) {
        this.globalObjIdCount = 0;
        this.gameWindow = _gameWindow;
    }

    public InitialiseEngine = (): void => {      
        this.time = new Time();
        this.gameWindow.InitialiseCanvas();
        this.gameObjects = new Array<EngineObject>();
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

    public Instantiate = (_obj: GameObject): void => {
        let newObj = new EngineObject(_obj, this.globalObjIdCount)
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

function GameLoop() {
    requestAnimationFrame(GameLoop);
    engine.Update();
}

window.onload = () => {
    engine.InitialiseEngine();

    InitialGameObjects();

    //Call each gameobjects Awake function
    for (let engineObj of engine.gameObjects) {
        engineObj.gameObject.Awake();
    }

    GameLoop();
};

function InitialGameObjects() {
    let rect: Rectangle = new Rectangle(10, 10, 200, 100, 2, "red");
    let rect2: Rectangle = new Rectangle(50, 50, 80, 300, 2, "blue");
    var obj: GameObject = new GameObject(new vec2(0, 0), new vec2(1, 1));

    obj.AddModule(rect);
    obj.AddModule(rect2);

    engine.Instantiate(obj);
}