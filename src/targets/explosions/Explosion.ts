const explosionFrames = require('../../dataset').explosion;

export default class Explosion {
    x: number
    y: number
    width: number
    height: number
    countFrame: number
    maxFrame: number

    constructor(x: number, y: number, maxFrame: number) {
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.countFrame = 1;
        this.maxFrame = maxFrame;
    }

    draw(context: CanvasRenderingContext2D): void {
        const image: HTMLImageElement = new Image();
        image.src = explosionFrames[this.countFrame];

        context.drawImage(image, this.x, this.y, this.width, this.height);
        this.updateFrame();
    }

    updateFrame(): void {
        if (this.maxFrame >= this.countFrame) {
            this.countFrame++;
        }
    }
}