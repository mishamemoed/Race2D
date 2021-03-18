import { LEVELS } from "./config/levels";
import World from "./game/world";
import controls from "./system/controls";
import DatConfig from "./system/dat.config";

document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
    console.log("Скрипты подключены");
    const ratio = 1;
    const world = new World({
        width: window.innerWidth * ratio,
        height: window.innerHeight * ratio
    }, LEVELS.ROAD_TEST);
    world.controls = controls;
    world.start();
    new DatConfig(world);
}