const dataset = require('../dataset');

export default class Target {
    x: number
    y: number
    width: number
    height: number
    image: HTMLImageElement

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.image = new Image();
        this.image.src = dataset.target;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xSpeed: number, ySpeed: number): void {
        this.x += xSpeed;
        this.y += ySpeed;
    }
}