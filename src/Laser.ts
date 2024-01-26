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
    id: number;
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

        this.lasers.push(newLaser);
    };

    draw(): void {
        const context = this.canvas.getContext('2d');
        if (!context) return;

        // Отрисовка лазеров
        context.strokeStyle = 'green';
        context.lineWidth = 2;

        this.lasers.forEach((laser: Laser): void => {
            const laserHeight = 5; // Высота лазера

            context.clearRect(laser.position.x - 1, laser.position.y - 4, 3, laserHeight);

            context.beginPath();
            context.moveTo(laser.position.x, laser.position.y);
            context.lineTo(laser.position.x, laser.position.y - laserHeight);
            context.stroke();
        });
    };

    isHit(laser: Laser, targets: (Position | null)[][], ) {
        for (let row = 0; targets.length > row; row++) {
            for (let target = 0; targets[0].length > target; target++) {
                const currentTarget = targets[row][target];

                if (
                    currentTarget && currentTarget.x === laser.position.x ||
                    currentTarget && currentTarget.x + 1  === laser.position.x ||
                    currentTarget && currentTarget.x - 1  === laser.position.x
                ) {
                    return { rowIndex: row, targetIndex: target };
                }
            }
        }

        return null;
    }

    move(targets: Targets): void {
        // Обновление позиции лазеров
        this.lasers.forEach((laser: Laser): void => {
            // Сдвигаем лазер вверх
            laser.position.y -= 1;
            const hit = this.isHit(laser, targets.matrix);
            console.log(hit, laser.position.x);
            if (hit) {
                console.log('Hit');
                targets.hit(hit.rowIndex, hit.targetIndex);
            }

            // Если лазер достиг верхней границы, удаляем его из массива
            if (laser.position.y < 0) {
                this.removeLaser(laser.id);
            }
        });
    }

    removeLaser(laserId: number): void {
        this.lasers = this.lasers.filter((laser) => laser.id !== laserId);
    }
}