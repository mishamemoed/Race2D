import _ from 'lodash'

export default class Camera {
    constructor(player, width, height, cameraWidth, cameraHeight) {
        this.x = 0;
        this.y = 0;
        this.player = player;
        this.startX = player.x;
        this.startY = player.y;
        this.width = width;
        this.height = height;
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;
        this.shake = _.throttle(this.shake, 3000)
    }
    update() {
        this.x = this.player.x - this.cameraWidth / 2;
        this.y = this.player.y - this.cameraHeight / 2;
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x + this.cameraWidth > this.width) {
            this.x = this.width - this.cameraWidth;
        }
        if (this.y + this.cameraHeight > this.height) {
            this.y = this.height - this.cameraHeight;
        }

    }
    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let result = Math.floor(Math.random() * (max - min)) + min;
        return result;
    }

    shake(time, amplitude, force) {
        let j = setInterval(() => {
            this.x = this.x + this.getRandom(-force, force);
            this.y = this.y + this.getRandom(-force, force);
        }, amplitude);
        setTimeout(() => {
            clearInterval(j);
        }, time);
    }
}
