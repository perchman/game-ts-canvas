interface Position {
    x: number;
    y: number;
}

interface Laser {
    id: number;
    position: Position;
}

export default class Lasers {
    canvas: HTMLCanvasElement
    lasers: Laser[]
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.lasers = [];
    }

    fire(position: Position): void {
        // Создание нового лазера с уникальным идентификатором
        const newLaser: Laser = {
            id: Date.now(),
            position: {...position},
        };

        // Обновление массива лазеров
        this.lasers.push(newLaser);
    };

    draw(): void {
        const context = this.canvas.getContext('2d');
        if (!context) return;

        // Отрисовка лазеров
        context.strokeStyle = 'green';
        context.lineWidth = 2;

        this.lasers.forEach((laser: Laser): void => {
            context.beginPath();
            context.moveTo(laser.position.x, laser.position.y);
            context.lineTo(laser.position.x, laser.position.y - 5);
            context.stroke();
        });
    };

    move(): void {
        // Обновление позиции лазеров
        this.lasers.forEach((laser: Laser): void => {
            // Сдвигаем лазер вверх
            laser.position.y -= 1;

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