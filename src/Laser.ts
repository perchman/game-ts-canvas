import Targets from "./Targets";

interface Position {
    x: number;
    y: number;
}

interface Laser {
    id: number;
    position: Position;
}

interface Target {
    isHit: boolean;
    position: Position
}

export default class Lasers {
    canvas: HTMLCanvasElement
    lasers: Laser[]
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.lasers = [];
    }

    fire(position: Position): void {
        const newLaser: Laser = {
            id: Date.now(),
            position: {...position},
        };
        console.log(newLaser.position, position);
        this.lasers.push(newLaser);
    };

    draw(): void {
        const context = this.canvas.getContext('2d');
        if (!context) return;

        context.strokeStyle = 'green';
        context.lineWidth = 2;

        this.lasers.forEach((laser: Laser): void => {
            const laserHeight = 5;

            context.clearRect(laser.position.x - 1, laser.position.y - 4, 3, laserHeight);

            context.beginPath();
            context.moveTo(laser.position.x, laser.position.y);
            context.lineTo(laser.position.x, laser.position.y - laserHeight);
            context.stroke();
        });
    };

    checkRadius(positionOne: Position, positionTwo: Position): boolean {
        if (positionOne.x === positionTwo.x) return true;

        const radius = 5;

        for (let i = 1; radius > i; i++) {
            if (
                positionOne.x === positionTwo.x + i ||
                positionOne.x === positionTwo.x - i
            ) {
                return true;
            }
        }

        return false;
    }

    isHit(laser: Laser, targets: Targets) {
        // if (targets[targets.length - 1][0].position.y !== laser.position.y) {
        //     return null;
        // }

        const matrix = targets.matrix;

        let targetIndex;

        for (let i = 0; matrix[0].length > i; i++) {
            if (this.checkRadius(laser.position, matrix[0][i].position)) {
                targetIndex = i;
                break;
            }
        }
        console.log(targetIndex, laser);
        if (targetIndex !== undefined) {
            for (let i = matrix.length - 1; i >= 0; i--) {
                if (matrix[i][0].position.y !== laser.position.y) {
                    return null;
                }
                console.log(this.checkRadius(laser.position, matrix[i][targetIndex].position));
                if (matrix[i][targetIndex].isHit) {
                    continue;
                }

                if (this.checkRadius(laser.position, matrix[i][targetIndex].position)) {
                    targets.hit(i, targetIndex);
                    return { rowIndex: i, targetIndex: targetIndex };
                }
            }
        }

        return null;
    }

    move(targets: Targets): void {
        console.log(this.lasers);
        this.lasers.forEach((laser: Laser): void => {
            laser.position.y -= 1;
            const hit = this.isHit(laser, targets);
            // Если лазер попадает в цель, удаляем его
            if (hit) {
                console.log('Hit');
                // targets.hit(hit.rowIndex, hit.targetIndex);
                this.removeLaser(laser.id);
            }

            // Если лазер достиг верхней границы, удаляем его
            if (laser.position.y < 0) {
                this.removeLaser(laser.id);
            }
        });
    }

    removeLaser(laserId: number): void {
        this.lasers = this.lasers.filter((laser) => laser.id !== laserId);
    }
}