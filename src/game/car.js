import { BaseObject } from "../system/baseObject";
import { SFC } from "./road"
import _ from "lodash"


export default class Car extends BaseObject {
    constructor(options) {
        super(options);
        this.acceleration = 0.1;
        this.maxSpeed = 5;
        this.slidingFrictionCoefficient = SFC.DRY_ASPHALT;
        this.discarding = _.throttle(this.discarding, 1000);
        this.rotateSpeed;
    }

    updateRotateSpeed() {
        let rp = this.speed / 3
        rp = rp < 1 ? 1 : rp
        this.rotateSpeed = rp
    }

    turnLeft() {
        super.turnLeft(this.rotateSpeed)
    }

    turnRight() {
        super.turnRight(this.rotateSpeed)
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
        this.updateRotateSpeed()
    }

    decreaseSpeed() {
        const { acceleration, speed } = this
        if (speed - acceleration < acceleration / 2 && this.speed > 0) {
            this.speed = 0
        } else {
            this.speed -= acceleration
        }
        this.updateRotateSpeed()

    }

    braking() {
        if (this.speed != 0) {
            this.speed *= 1 - this.slidingFrictionCoefficient / 50
            if (this.speed < 0.01 && this.speed > 0) {
                this.speed = 0
            }
        }
        this.updateRotateSpeed()

    }

    checkCollision() {
        const { roads, walls, camera } = this.world
        roads.forEach(road => {
            if (this.collision(road)) {
                this.slidingFrictionCoefficient = road.sfc
            }
        });
        for (let wall of walls) {
            if (this.collision(wall)) {
                let edge = this.getEdge(wall)
                this.discarding(edge)
                camera.shake(1000, 10, this.speed / 3)
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