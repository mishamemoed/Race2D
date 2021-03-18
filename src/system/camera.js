export default class Camera {
    constructor(player, width, height, cameraWidth,cameraHeight) {
        this.x = 0;
        this.y = 0;
        this.player = player;
        this.startX = player.x;
        this.startY = player.y;
        this.width = width;
        this.height = height;
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;
    }
    update() {
        this.x = this.player.x - this.startX;
        this.y = this.player.y - this.startY;
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
}