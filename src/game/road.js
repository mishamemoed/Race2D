import { ACTIONS } from "../config/actions";
import { BaseObject } from "../system/baseObject";

export const SFC = {
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

    notify(event){
        const { type } = event
        if(this.actions) {
            let actions = this.actions
            .filter(a => a.event === type)
            .map(a => ACTIONS[a.action])
            for(let a of actions){
                a(this, event)
            }
        }
    }
    checkCollision() {
    }
}

