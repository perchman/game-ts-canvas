import Target from "./Target";
import LasersController from "../lasers/LasersController";
import ExplosionsController from "./explosions/ExplosionsController";

export default class TargetsController {
    canvas: HTMLCanvasElement
    matrix: Target[][]
    currentDirection: string
    xSpeed: number
    ySpeed: number
    defaultXSpeed: number
    defaultYSpeed: number
    moveDownTimerDefault: number
    moveDownTimer: number
    targetLasersController: LasersController
    shipLasersController: LasersController
    laserTimerDefault: number
    laserTimer: number
    explosionsController: ExplosionsController

    constructor(
        canvas: HTMLCanvasElement,
        targetLasersController: LasersController,
        shipLasersController: LasersController,
        explosionsController: ExplosionsController
    ) {
        this.canvas = canvas;
        this.matrix = [];

        this.currentDirection = 'right';
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.defaultXSpeed = 1;
        this.defaultYSpeed = 1;
        this.moveDownTimerDefault = 30;
        this.moveDownTimer = this.moveDownTimerDefault;

        this.targetLasersController = targetLasersController;
        this.shipLasersController = shipLasersController;
        this.laserTimerDefault = 40;
        this.laserTimer = this.laserTimerDefault;

        this.explosionsController = explosionsController;
    }

    createTargets(): void {
        const rows = 3;
        const paddingX = 50;
        const paddingY = 35;
        const cols = Math.floor(((this.canvas.width * 0.7) + paddingX) / (paddingX));

        for (let i = 0; rows > i; i++) {
            const row = [];

            for (let j = 0; cols > j; j++) {
                row.push(new Target(j * paddingX, i * paddingY, this.explosionsController));
            }

            this.matrix.push(row);
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        this.decrementMoveDownTimer();
        this.updateMoveDirection();
        this.collisionDetection();
        this.drawTargets(context);
        this.resetMoveDownTimer();
        this.fire();
    }

    decrementMoveDownTimer(): void {
        if (
            this.currentDirection === 'downLeft' ||
            this.currentDirection === 'downRight'
        ) {
            this.moveDownTimer--;
        }
    }

    updateMoveDirection(): void {
        for (let row of this.matrix) {
            if (this.currentDirection === 'right') {
                this.xSpeed = this.defaultXSpeed;
                this.ySpeed = 0;

                const rightmostTarget: Target = row[row.length - 1];
                if (rightmostTarget.x + rightmostTarget.width >= this.canvas.width) {
                    this.currentDirection = 'downLeft';
                }
            } else if (this.currentDirection === 'downLeft') {
                if (this.moveDown('left')) {
                    return;
                }
            } else if (this.currentDirection === 'left') {
                this.xSpeed = -this.defaultXSpeed;
                this.ySpeed = 0;

                const leftmostTarget: Target = row[0];
                if (0 >= leftmostTarget.x) {
                    this.currentDirection = 'downRight';
                }
            } else if (this.currentDirection === 'downRight') {
                if (this.moveDown('right')) {
                    return;
                }
            }
        }
    }

    drawTargets(context: CanvasRenderingContext2D): void {
        for (let row of this.matrix) {
            for (let target of row) {
                target.move(this.xSpeed, this.ySpeed);
                target.draw(context);
            }
        }
    }

    resetMoveDownTimer(): void {
        if (0 >= this.moveDownTimer) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    moveDown(newDirection: string): boolean {
        this.xSpeed = 0;
        this.ySpeed = this.defaultYSpeed;

        if (0 >= this.moveDownTimer) {
            this.currentDirection = newDirection;
            return true;
        }

        return false;
    }

    fire(): void {
        this.laserTimer--;
        if (this.laserTimer <= 0) {
            this.laserTimer = this.laserTimerDefault;
            const allTargets: Target[] = this.matrix.flat();
            const index: number = Math.floor(Math.random() * allTargets.length);
            const target: Target = allTargets[index];
            this.targetLasersController.fire(target.x + target.width / 2, target.y, -3);
        }
    }

    collisionDetection(): void {
        this.matrix.forEach((row) => {
            row.forEach((target, index) => {
                if (this.shipLasersController.isCollide(target)) {
                    target.explosion();
                    row.splice(index, 1);
                }
            });
        });

        this.matrix = this.matrix.filter((row) => row.length > 0);
    }

    isCollide(entity: any): boolean {
        return this.matrix.flat().some((target: Target) => target.isCollide(entity));
    }

    restart(): void {
        this.matrix = [];
        this.createTargets();
    }
}