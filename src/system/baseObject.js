import _ from 'lodash';
import Sprite from './sprite';

export const UP = 'WALK_UP';
export const RIGHT = 'WALK_RIGHT';
export const LEFT = 'WALK_LEFT';
export const DOWN = 'WALK_DOWN';
export const STAY = 'STAY';

export class BaseObject {
    constructor(options) {
        this.x;
        this.y;
        this.speed;
        this.angle = 0;
        this.width;
        this.height;
        this.color = "#0000FF";
        this.image;
        this.imagePattern;
        this.sprite;
        this.spriteDirection = STAY;
        this.isDead = false;
        this.world;
        this.health = 100;
        this.inventory = [];
        this.experience = 0;
        this.isHealthShow = false;
        this.dropRadius = 100;
        this.moveDelay = 10;
        this.subscribers = [];
        this.hints = [];
        this.hintCooldown = 500;
        this.defaultState = STAY;
        for (const key of Object.keys(options)) {
           this[key] = options[key];
        }
        if (options.imageSrc) {
            this.image = new Image();
            this.image.src = options.imageSrc;
        }
        if (options.spriteSrc) {
            this.sprite = new Sprite(options.spriteSrc);
        }
        if (this.offsetX) {
            this.x += this.offsetX;
        }
        if (this.offsetY) {
            this.y += this.offsetY;
        }
        if (this.sounds) {
            for (let key in this.sounds) {
                this.sounds[key] = new Audio(this.sounds[key]);
            }
        }
        this.move = _.throttle(this.move, this.moveDelay);
        this.addHint = _.throttle(this.addHint, this.hintCooldown);
    }

    setDefaultState(state) {
        this.defaultState = state;
    }

    getArea() {
        return this.height * this.width;
    }

    addHint(message, color) {
        this.hints.push({
            message,
            color,
            x: this.x,
            y: this.y,
            alpha: 1
        });
    }

    renderHints(canvas) {
        for (let hint of this.hints) {
            hint.y -= 1;
            hint.alpha -= 0.008;
            if (hint.alpha <= 0) {
                this.hints = this.hints.filter(it => it !== hint);
                continue;
            }
            canvas.globalAlpha = hint.alpha;
            canvas.fillStyle = hint.color;
            canvas.font = "bold 30px Arial";
            canvas.fillText(hint.message, hint.x, hint.y);
            canvas.globalAlpha = 1;
        }
    }

    playSound(name) {
        const { sounds } = this;
        if (sounds && sounds[name]) {
            sounds[name].play();
        } else {
            console.warn(`Звука ${name} нет в ${this.constructor.name}`);
        }
    }

    increaseExperience(exp) {
        let levelBefore = this.getLevel().level;
        this.experience += exp;
        let levelAfter = this.getLevel().level;
        if (levelBefore !== levelAfter) {
            this.health = 100;
            this.addHint("Level Up!", "#ffc000");
            this.playSound("LEVEL_UP");
        } else {
            this.addHint("EXP " + exp, "#94d229");
        }
    }

    addItem(item) {
        item.owner = this;
        this.inventory.push(item);
    }

    deleteItem(item) {
        this.inventory = this.inventory.filter(it => it.uuid != item.uuid);
    }

    deleteQuestItem(item) {
        this.inventory = this.inventory
            .filter(it => !(it.type === item.type && it.name === item.name));
    }

    setTexture(path, isRepeatable, canvas) {
        if (isRepeatable) {
            let image = new Image();
            image.src = path;
            image.onload = () => this.imagePattern = canvas.createPattern(image, 'repeat');
        } else {
            this.image = new Image();
            this.image.src = path;
        }
    }

    addHealth(amount) {
        if (this.health < 100) {
            this.health += amount;
        }
        this.addHint("+" + amount + " HP", "#ff3333");
    }

    getLevel() {
        let needExp = 100;
        let level = 1;
        const { experience } = this;
        let exp = experience;
        while (exp >= needExp) {
            exp -= needExp;
            needExp *= 2;
            level++;
        }
        return { level, exp, needExp };
    }

    onRender(canvas) {
        // перекрыть в дочерних классах
    }

    renderHealthBar(canvas) {
        const height = 10;
        const margin = 2;
        const y = this.y - 20;
        canvas.fillStyle = "rgba(150, 150, 150, 0.5)";
        canvas.fillRect(this.x, y, this.width, height);
        const ratio = this.health / 100;
        const widthHealth = (this.width - 2 * margin) * ratio;
        const heightHealth = height - 2 * margin;
        canvas.fillStyle = "rgba(150, 0, 0, 0.7)";
        canvas.fillRect(this.x + margin, y + margin, 
                widthHealth, heightHealth);
        let levelInfo = this.getLevel();
        canvas.font = "16px Comic Sans MS";
        canvas.fillStyle = "#ff0000";
        canvas.fillText(levelInfo.level,
                        this.x + this.width + margin, y + 10);
    }

    render(canvas) {
        if (this.isDead) {
            return;
        }
        canvas.save();
        let hw = this.width / 2;
        let hh = this.height / 2;
        canvas.translate(this.x + hw, this.y + hh);
        canvas.fillStyle = this.color;
        let rad = this.degToRad(this.angle);
        canvas.rotate(rad);
        if (this.sprite) {
            let { offsetX, offsetY, width, height } = this;
            const frame = this.sprite.getFrame(this.spriteDirection);
            const { x, y, w, h, image } = frame;
            offsetX = offsetX ? offsetX : 0;
            offsetY = offsetY ? offsetY : 0;
            canvas.drawImage(image, x + offsetX, y + offsetY, width, height, -hw, -hh, width, height);
        } else if (this.image) {
            let { offsetX, offsetY, image, width, height } = this;
            offsetX = offsetX ? offsetX : 0;
            offsetY = offsetY ? offsetY : 0;
            canvas.drawImage(image, offsetX, offsetY, width, height, -hw, -hh, width, height);
        } else if (this.imagePattern) {
            canvas.fillStyle = this.imagePattern;
            canvas.fillRect(-hw, -hh, this.width, this.height);
        } else {
            canvas.fillRect(-hw, -hh, this.width, this.height);
        }
        canvas.restore();
        this.onRender(canvas);
        if (this.isHealthShow) {
            this.renderHealthBar(canvas);
        }
        this.renderHints(canvas);
    }

    renderPoint(x, y, color) {
        canvas.fillStyle = color;
        canvas.beginPath();
        canvas.arc(x, y, 5, 0, Math.PI * 2, true);
        canvas.fill();
    }

    kill() {
        this.isDead = true;
        this.playSound("DEAD");
    }

    randomInt(min, max) {
        let d = max - min;
        let r = Math.round(Math.random() * d);
        return r + min;
    }

    checkCollision() {
        console.error("Перекрой меня в классе " + this.constructor.name);
    }

    turnRight() {
        this.turnRight(1);
    }

    turnLeft() {
        this.turnLeft(1);
    }

    turnRight(deg) {
        this.angle += deg;
        if (this.checkCollision()) {
            this.angle -= deg;
        } else {
            this.checkAngleLimits();
        }
    }

    turnLeft(deg) {
        this.angle -= deg;
        if (this.checkCollision()) {
            this.angle += deg;
        } else {
            this.checkAngleLimits();
        }
    }

    checkAngleLimits() {
        if (this.angle > 360) {
            this.angle -= 360;
        }
        if (this.angle < -360) {
            this.angle += 360;
        }
    }

    getDistance(object) {
        const thisX = this.x + this.width / 2;
        const thisY = this.y + this.height / 2;
        const objX = object.x + object.width / 2;
        const objY = object.y + object.height / 2;
        let deltaX = thisX - objX;
        let deltaY = thisY - objY;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return distance;
    }

    move(delta) {
        this.x += delta.deltaX;
        this.y += delta.deltaY;
        if (this.checkCollision()) {
            this.x -= delta.deltaX;
            this.y -= delta.deltaY;
        }
    }

    moveAngle(angle) {
        let direction = Math.round(angle / 90);
        this.moveDirection(direction);
    }

    moveDirection(direction) {
        if (direction === 0 || direction === 4) {
            this.moveRight();
        } else if (direction === 1) {
            this.moveUp();
        } else if (direction === 2) {
            this.moveLeft();
        } else if (direction === 3) {
            this.moveDown();
        }
    }

    moveXY(x, y) {
        let angle = this.angleBetween({x, y});
        let direction = Math.round(angle / 90);
        this.moveDirection(direction);
    }

    moveUp() {
        let delta = this.theoremSin(this.angle - 90, this.speed);
        this.move(delta);
        this.spriteDirection = UP;
    }

    moveDown() {
        let delta = this.theoremSin(this.angle + 90, this.speed);
        this.move(delta);
        this.spriteDirection = DOWN;
    }

    moveRight() {
        let delta = this.theoremSin(this.angle, this.speed);
        this.move(delta);
        this.spriteDirection = RIGHT;
    }

    moveLeft() {
        let delta = this.theoremSin(this.angle + 180, this.speed);
        this.move(delta);
        this.spriteDirection = LEFT;
    }

    angleBetween(object) {
        let a = this;
        let b = object;
        let angleDeg = Math.atan2(-(b.y - a.y), b.x - a.x) * 180 / Math.PI;
        return angleDeg < 0 ? 360 + angleDeg : angleDeg;
    }

    theoremSin(angle, distance) {
        let alpha = angle;
        let beta = 90 - alpha;
        let gamma = Math.PI / 2;
        let deltaX = Math.sin(this.degToRad(beta)) * distance
                     / Math.sin(gamma);
        let deltaY = Math.sin(this.degToRad(alpha)) * distance
                     / Math.sin(gamma);
        return { deltaX, deltaY }
    }
    
    degToRad(deg) {
        return deg * Math.PI / 180;
    }

    collision(object) {
        const { background, foreground } = this;
        if (background || foreground) return false;
        let r1 = this.collisionTo(object);
        let r2 = object.collisionTo(this);
        return r1 || r2;
    }

    collisionTo(object) {
        let r1 = this.isPointInObject(object.getRightBottomPoint());
        let r2 = this.isPointInObject(object.getLeftBottomPoint());
        let r3 = this.isPointInObject(object.getLeftTopPoint());
        let r4 = this.isPointInObject(object.getRightTopPoint());
        return r1 || r2 || r3 || r4;
    }

    getRightTopPoint() {
        let hw = this.width / 2;
        let hh = this.height / 2;
        let point = this.rotatePoint(hw, -hh, this.angle);
        return {x: point.x + this.x + hw, y: point.y + this.y + hh}
    }

    getLeftBottomPoint() {
        let hw = this.width / 2;
        let hh = this.height / 2;
        let point = this.rotatePoint(-hw, hh, this.angle);
        return {x: point.x + this.x + hw, y: point.y + this.y + hh}
    }

    getLeftTopPoint() {
        let hw = this.width / 2;
        let hh = this.height / 2;
        let point = this.rotatePoint(-hw, -hh, this.angle);
        return {x: point.x + this.x + hw, y: point.y + this.y + hh}
    }

    getRightBottomPoint() {
        let hw = this.width / 2;
        let hh = this.height / 2;
        let point = this.rotatePoint(hw, hh, this.angle);
        return {x: point.x + this.x + hw, y: point.y + this.y + hh}
    }

    isPointInObject(point) {
        let x = this.x;
        let y = this.y;
        let angle = this.angle;
        let hw = this.width / 2;
        let hh = this.height / 2;
        let centerX = x + hw;
        let centerY = y + hh;
        let p1X = point.x - centerX;
        let p1Y = point.y - centerY;
        let p1 = this.rotatePoint(p1X, p1Y, -angle);
        p1X = p1.x + centerX;
        p1Y = p1.y + centerY;
        if (p1X >= x && p1X <= x + this.width
            && p1Y >= y && p1Y <= y + this.height) {
            return true;
        } else {
            return false; 
        }
    }

    rotatePoint(x, y, angle) {
        let a = this.degToRad(angle);
        let x1 = x * Math.cos(a) - y * Math.sin(a);
        let y1 = x * Math.sin(a) + y * Math.cos(a);
        return {x: x1, y: y1}
    }
}