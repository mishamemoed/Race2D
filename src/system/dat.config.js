import * as dat from 'dat.gui';

export default class DatConfig {
    constructor(world) {
        const { camera, level, player } = world;
        const gui = new dat.GUI({
            width: 300,
            closed: false
        });
        gui.useLocalStorage = true;
        const cameraFolder = gui.addFolder("Camera props");
        cameraFolder.add(camera, "x", 0, level.width).listen();
        cameraFolder.add(camera, "y", 0, level.height).listen();
        const playerFolder = gui.addFolder("Player props");
        playerFolder.add(player, "x", 0, level.width).listen();
        playerFolder.add(player, "y", 0, level.height).listen();
        playerFolder.add(player, "speed", 0.00000000001, level.maxSpeed).listen();
     }
}