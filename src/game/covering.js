import { BaseObject } from "../system/baseObject";

export default class Covering extends BaseObject{
    constructor(options){
        super(options)
        this.background = true
    }
}