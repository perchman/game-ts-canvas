import Ship from "./ship/Ship";
import TargetsController from "./targets/TargetsController";
import LasersController from "./lasers/LasersController";
const dataset = require("./dataset");

export default class Game {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    background: HTMLImageElement
    isPlay: boolean
    isWin: boolean
    isGameOver: boolean
    btnPx: number
    numberOfPixelsPerStep: number
    directionResizeBtn: string
    shipLasersController: LasersController
    ship: Ship
    targetsLasersController: LasersController
    targetsController: TargetsController

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D

        this.background = new Image();
        this.background.src = dataset.space;

        this.isPlay = false;
        this.isWin = false;
        this.isGameOver = false;

        this.btnPx = 20;
        this.numberOfPixelsPerStep = 0.2;
        this.directionResizeBtn = 'increase';

        this.shipLasersController = new LasersController(canvas, 10, 'green');
        this.ship = new Ship(this.canvas, this.shipLasersController);

        this.targetsLasersController = new LasersController(canvas, 4, 'red');
        this.targetsController = new TargetsController(canvas, this.targetsLasersController, this.shipLasersController);
        this.targetsController.createTargets();

        document.addEventListener("keyup", this.keyup);
    }

    play = (): void => {
        this.checkGameOver();

        this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

        if (!this.isPlay && !this.isGameOver) {
            this.displayIntro()
        } else {
            if (!this.isGameOver) {
                this.ship.draw(this.context);
                this.shipLasersController.draw(this.context);
                this.targetsController.draw(this.context);
                this.targetsLasersController.draw(this.context);
            } else {
                this.displayGameOver();
            }
        }
    }

    displayIntro(): void {
        this.drawBtn('Start Press "Space"', this.canvas.width / 2, this.canvas.height / 2);
    }

    displayGameOver(): void {
        let text: string = this.isWin ? "You Win" : "Game Over";
        this.context.fillStyle = "white";
        this.context.font = "70px Arial";
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2 - 40);

        this.drawBtn('Restart Press "Space"', this.canvas.width / 2, this.canvas.height / 2 + 30);
    }

    updateDirectionAndResizeBtn(): void {
        if (this.directionResizeBtn === 'increase') {
            this.resizeBtn(this.numberOfPixelsPerStep);

            if (this.btnPx >= 30) {
                this.directionResizeBtn = 'decrease';
            }
        } else {
            this.resizeBtn(-this.numberOfPixelsPerStep);

            if (this.btnPx <= 20) {
                this.directionResizeBtn = 'increase';
            }
        }
    }

    resizeBtn(pixel: number): void {
        this.btnPx += pixel;
    }

    drawBtn(text: string, x: number, y: number): void {
        this.updateDirectionAndResizeBtn();

        this.context.fillStyle = 'green';
        this.context.font = `${this.btnPx}px Arial`;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        this.context.fillText(text, x, y);
    }

    checkGameOver(): void {
        if (this.isGameOver) {
            return;
        }

        if (this.targetsLasersController.isCollide(this.ship)) {
            this.isPlay = false;
            this.isGameOver = true;
        }

        if (this.targetsController.isCollide(this.ship)) {
            this.isPlay = false;
            this.isGameOver = true;
        }

        if (this.targetsController.matrix.length === 0) {
            this.isPlay = false;
            this.isWin = true;
            this.isGameOver = true;
        }
    }

    nextLevel(): void {

    }

    restart(): void {
        this.shipLasersController.restart();
        this.ship.restart();
        this.targetsLasersController.restart();
        this.targetsController.restart();
        this.isGameOver = false;
        this.isPlay = true;
        this.isWin = false;
    }

    keyup = (event: KeyboardEvent): void => {
        if (event.code === 'Space') {
            if (this.isGameOver) {
                this.restart();
            }
            if (!this.isPlay) {
                this.isPlay = true;
            }
        }
    }
}