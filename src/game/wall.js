import { BaseObject } from "../system/baseObject";
import { ACTIONS } from "../config/actions";

export default class Wall extends BaseObject {
    constructor(options) {
        super(options)
    }

    notify(event) {
        const { type } = event
        if (this.actions) {
            let actions = this.actions
                .filter(a => a.event === type)
                .map(a => ACTIONS[a.action])
            for (let a of actions) {
                a(this, event)
            }
        }
    }
    checkCollision() {
       
    }
}