export default class EventBus{
    constructor(){
        this.subscribers = []
    }

    subscribe(obj){
        this.subscribers.push(obj)
    }

    unsubscribe(obj){
        this.subscribers = this.subscribers.filter(s => s !== obj)
    }

    fireEvent(event){
        this.subscribers.forEach(s => s.notify(event))
    }
}