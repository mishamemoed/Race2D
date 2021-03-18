import { BaseObject } from "../system/baseObject";

export const SFC = {
    BETA_MATERIAL: 1,
    DRY_ASPHALT: 0.5,
    WET_ASPHALT: 0.35,
    DRY_DIRT_ROAD: 0.4,
    WET_DIRT_ROAD: 0.3,
    ICE: 0.15
}

export default class Road extends BaseObject{
    constructor(options){
        super(options)
        this.background = true
    }
    checkCollision() {
    }
}

