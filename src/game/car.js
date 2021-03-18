import { BaseObject } from "../system/baseObject";
import { SFC } from "./road"


export default class Car extends BaseObject {
    constructor(options) {
        super(options);
        this.acceleration = 1
        this.maxSpeed = 20
        this.slidingFrictionCoefficient = SFC.DRY_ASPHALT
    }
    onRender() {
        this.moveUp(this.speed);
        this.braking();
    }

    increaseSpeed(){
        const { acceleration, speed, maxSpeed } = this
        if( speed + acceleration > maxSpeed){
            this.speed = maxSpeed
        } else {
            this.speed += acceleration
        }

    }

    decreaseSpeed(){
        const { acceleration, speed } = this
        if(speed - acceleration < acceleration / 2){
            this.speed = 0
        } else {
            this.speed -= acceleration
        }
    }

    braking() {
        if (this.speed != 0) {
            this.speed *= 1 - this.slidingFrictionCoefficient / 10
            if(this.speed < 0.5){
                this.speed = 0
            }
        }
    }

    checkCollision() {
    }
}