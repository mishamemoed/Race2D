import { BaseObject } from "../system/baseObject";
import { SFC } from "./road"
import _ from "lodash"


export default class Car extends BaseObject {
    constructor(options) {
        super(options);
        this.acceleration = 1
        this.maxSpeed = 20
        this.slidingFrictionCoefficient = SFC.DRY_ASPHALT
        this.discarding = _.throttle(this.discarding, 1000)
    }
    onRender() {
        this.moveUp(this.speed);
        this.braking();
    }

    increaseSpeed() {
        const { acceleration, speed, maxSpeed } = this
        if (speed + acceleration > maxSpeed) {
            this.speed = maxSpeed
        } else {
            this.speed += acceleration
        }

    }

    decreaseSpeed() {
        const { acceleration, speed } = this
        if (speed - acceleration < acceleration / 2 && this.speed > 0) {
            this.speed = 0
        } else {
            this.speed -= acceleration
        }
    }

    braking() {
        if (this.speed != 0) {
            this.speed *= 1 - this.slidingFrictionCoefficient / 10
            if (this.speed < 0.5 && this.speed > 0) {
                this.speed = 0
            }
        }
    }

    checkCollision() {
        const { roads, walls } = this.world
        roads.forEach(road => {
            if (this.collision(road)) {
                this.slidingFrictionCoefficient = road.sfc
            }
        });
        for (let wall of walls) {
            if (this.collision(wall)) {
                let edge = this.getEdge(wall)
                this.discarding(edge)
                return true
            }
        }
    }

    getEdge(object) {
        let r1 = object.isPointInObject(this.getRightBottomPoint());
        let r2 = object.isPointInObject(this.getLeftBottomPoint());
        let r3 = object.isPointInObject(this.getLeftTopPoint());
        let r4 = object.isPointInObject(this.getRightTopPoint());
        if (r1) return "right-bottom"
        if (r2) return "left-bottom"
        if (r3) return "left-top"
        if (r4) return "right-top"
    }

    discarding(edge) {
        console.log("Бабах");
        let i = setInterval(() => {
            switch (edge) {
                case "right-bottom":
                    this.increaseSpeed();
                    this.turnRight(5);
                    break
                case "left-bottom":
                    this.increaseSpeed();
                    this.turnLeft(5);
                    break
                case "left-top":
                    this.decreaseSpeed();
                    this.turnRight(5);
                    break
                case "right-top":
                    this.decreaseSpeed();
                    this.turnLeft(5);
                    break
            }

        }, 10);
        setTimeout(() => {
            clearInterval(i);
        }, 100);
    }
}