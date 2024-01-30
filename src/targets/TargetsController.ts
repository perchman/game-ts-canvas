import Target from "./Target";

export default class TargetsController {
    canvas: HTMLCanvasElement
    matrix: Target[][]
    // moveDirection: { [key: string]: number; }
    currentDirection: string
    xSpeed: number
    ySpeed: number
    defaultXSpeed: number
    defaultYSpeed: number
    moveDownTimerDefault: number
    moveDownTimer: number

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.matrix = [];

        // this.moveDirection = {
        //     left: 0,
        //     right: 1,
        //     downLeft: 2,
        //     downRight: 3
        // }

        this.currentDirection = 'right';
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.defaultXSpeed = 1;
        this.defaultYSpeed = 1;
        this.moveDownTimerDefault = 30;
        this.moveDownTimer = this.moveDownTimerDefault;
    }

    createTargets() {
        const rows = 3;
        const cols = 10;

        const paddingLR = 50; // Х расстояние между целями
        const paddingTB = 35; // Y расстояние между целями

        for (let i = 0; rows > i; i++) {
            const row = [];

            for (let j = 0; cols > j; j++) {
                row.push(new Target(j * paddingLR, i * paddingTB));
            }

            this.matrix.push(row);
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.decrementMoveDownTimer();
        this.updateSpeedAndDirection();
        this.drawTargets(context);
        this.resetMoveDownTimer();
    }

    decrementMoveDownTimer() {
        if (
            this.currentDirection === 'downLeft' ||
            this.currentDirection === 'downRight'
        ) {
            this.moveDownTimer--;
        }
    }

    updateSpeedAndDirection() {
        loop: for (let row of this.matrix) {
            switch (this.currentDirection) {
                case 'right':
                    this.xSpeed = this.defaultXSpeed;
                    this.ySpeed = 0;

                    const rightmostTarget: Target = row[row.length - 1];
                    if (rightmostTarget.x + rightmostTarget.width >= this.canvas.width) {
                        this.currentDirection = 'downLeft';
                        break;
                    }
                    break;

                case 'downLeft':
                    if (this.moveDown('left')) {
                        break loop;
                    }
                    break;

                case 'left':
                    this.xSpeed = -this.defaultXSpeed;
                    this.ySpeed = 0;

                    const leftmostTarget: Target = row[0];
                    if (0 >= leftmostTarget.x) {
                        this.currentDirection = 'downRight';
                        break;
                    }

                // case 'downRight':
                //     if (this.moveDown('right')) {
                //         break loop;
                //     }
                //     break;
            }
        }
    }

    drawTargets(context: CanvasRenderingContext2D) {
        for (let row of this.matrix) {
            for (let target of row) {
                target.move(this.xSpeed, this.ySpeed);
                target.draw(context);
            }
        }
    }

    resetMoveDownTimer() {
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




}