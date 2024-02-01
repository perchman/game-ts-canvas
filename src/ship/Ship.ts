const dataset = require('../dataset');
import LasersController from "../lasers/LasersController";

export default class Ship {
    canvas: HTMLCanvasElement
    x: number
    y: number
    width: number
    height: number
    image: HTMLImageElement
    speed: number
    isMoveToTheRight: boolean
    isMoveToTheLeft: boolean
    lasersController: LasersController
    laserSpeed: number
    isFire: boolean

    constructor(canvas: HTMLCanvasElement, laserController: LasersController) {
        this.canvas = canvas;

        this.x = canvas.width / 2;
        this.y = canvas.height - canvas.height * 0.125;

        this.width = 49;
        this.height = 50;

        this.image = new Image();
        this.image.src = dataset.ship;

        this.speed = 3;

        this.isMoveToTheRight = false;
        this.isMoveToTheLeft = false;

        this.lasersController = laserController;
        this.laserSpeed = 4;
        this.isFire = false;

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(context: CanvasRenderingContext2D): void {
        if (this.isFire) {
            this.lasersController.fire(this.x + this.width / 2, this.y, this.speed, 10);
        }
        this.move();
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(): void {
        // Check if the move button is pressed
        // And check that the ship remains within the canvas boundaries
        if (this.isMoveToTheRight) {
            if (this.x + this.speed >= this.canvas.width - this.width) {
                this.x = this.canvas.width - this.width;
            } else {
                this.x += this.speed;
            }
        } else if (this.isMoveToTheLeft) {
            if (this.x - this.speed <= 0) {
                this.x = 0;
            } else {
                this.x -= this.speed;
            }
        }
    }

    keydown = (event: KeyboardEvent): void => {
        if (event.code === 'ArrowRight' || event.code === 'KeyD') {
            this.isMoveToTheRight = true;
        } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
            this.isMoveToTheLeft = true;
        } else if (event.code === 'Space') {
            this.isFire = true;
        }
    }

    keyup = (event: KeyboardEvent): void => {
        if (event.code === 'ArrowRight' || event.code === 'KeyD') {
            this.isMoveToTheRight = false;
        } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
            this.isMoveToTheLeft = false;
        } else if (event.code === 'Space') {
            this.isFire = false;
        }
    }

    restart(): void {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - this.canvas.height * 0.125;
    }
}