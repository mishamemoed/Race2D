import Camera from "../system/camera";
import Car from "./car";
import Road from "./road";

export default class World {
    constructor(options, initLevel) {
        this.options = options;
        const { canvas, domElement } = this.createCanvas(options);
        this.canvas = canvas;
        this.domElement = domElement;
        this.isRunning = false;
        this.background;
        this.level;
        this.camera;
        this.player = new Car({
            imageSrc: "images/car-test.png",
            width: 53,
            height: 100,
            speed: 0,
            angle: 180,
            x: 50,
            y: 50
        });
        this.roads = []
        this.loadLevel(initLevel);
    }

    loadLevel(level) {
        this.level = level;
        const { backgroundSrc, roads } = level;
        this.background = new Image();
        this.background.src = backgroundSrc;
        this.roads = roads.map(road => this.createRoad(road))
        this.createCamera();
    }

    createRoad(options) {
        const newRoad = new Road(options)
        newRoad.world = this
        newRoad.setTexture(options.textureSrc, true, this.canvas)
        return newRoad
    }

    start() {
        this.isRunning = true;
        this.render();
    }

    stop() {
        this.isRunning = false;
    }

    render = () => {
        const { isRunning, canvas, options,
            background, camera, player, controls } = this;
        const { roads } = this
        const { width, height } = options;
        if (isRunning) requestAnimationFrame(this.render);
        canvas.save();
        canvas.translate(-camera.x, -camera.y);
        canvas.drawImage(background, 0, 0);
        roads.forEach(road => road.render(canvas))
        player.render(canvas);
        camera.update();
        canvas.restore();
        controls(this);
    }

    createCanvas({ width, height }) {
        let game = document.createElement("canvas");
        game.width = width;
        game.height = height;
        document.body.appendChild(game);
        return {
            canvas: game.getContext("2d"),
            domElement: game
        }
    }

    createCamera() {
        const { level, player, domElement } = this;
        const { width, height } = level;
        const { width: cWidth, height: cHeight } = domElement;
        this.camera = new Camera(player, width, height, cWidth, cHeight);
    }
}

