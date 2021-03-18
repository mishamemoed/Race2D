import THREEx from './keyboard';

const keyboard = new THREEx.KeyboardState();

export default function controls(world) {
    if (keyboard.pressed("W")) {
        world.player.increaseSpeed()    
    } else if (keyboard.pressed("S")) {
        world.player.decreaseSpeed();
    }

    if (world.player.speed > 0) {
        turns(world);
    }
}

function turns(world) {
    let inverse = false;
    if (world.player.speed < 0) inverse = true;
    if (keyboard.pressed(inverse ? "A" : "D")) {
        world.player.turnRight(5);
    } else if (keyboard.pressed(inverse ? "D" : "A")) {
        world.player.turnLeft(5);
    }
}