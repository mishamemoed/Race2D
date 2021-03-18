import { BaseObject } from "../system/baseObject";
export const SFC = {
    BETA_MATERIAL: 1,
    DRY_ASPHALT: 0.5,
    WET_ASPHALT: 0.35,
    DRY_DIRT_ROAD: 0.4,
    WET_DIRT_ROAD: 0.3,
    ICE: 0.15
}

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