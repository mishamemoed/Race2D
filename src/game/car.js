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
                this.discarding()
                return true
            }
        }
    }
    discarding() {
        console.log("Ты был в школе вождения?")
        let i = setInterval(() => {
            this.decreaseSpeed()
            this.turnRight(5)
        }, 10)
            setTimeout(() => {
                clearInterval(i)
            }, 100)

        }
}