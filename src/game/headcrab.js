export default class HeadCrab {
    constructor(car) {
        this.car = car;
    }

    control() {
        let nextPoint = this.getNextPoint();
        console.log(nextPoint);
        this.car.increaseSpeed();
    }

    getNextPoint(){
        const { lapCounter } = this.car;
        if (lapCounter.currentCheckpoint === -1) {
            let start = this.getStartLine();
            let center = start.getCenterPoint(); 
            return center;
        } else {
            let checkpoint = this.getCheckpoint(lapCounter.currentCheckpoint + 1);
            let center = checkpoint.getCenterPoint();
            return center;
        }
    }

    getStartLine() {
        const { walls } = this.car.world;
        return walls.filter(w => w.name === "start_line")[0];
    }

    getCheckpoint(num) {
        const { walls } = this.car.world;
        return walls.filter(w => w.name === `checkpoint_${num}`)[0];
    }
}