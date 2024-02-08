import Laser from "./Laser";

export default class LasersController {
    canvas: HTMLCanvasElement
    lasers: Laser[]
    intervalBetweenShots: number
    maxLasers: number
    color: string

    constructor(canvas: HTMLCanvasElement, maxLasers: number, color: string) {
        this.canvas = canvas;

        this.lasers = [];
        this.intervalBetweenShots = 0;
        this.maxLasers = maxLasers;
        this.color = color;
    }

    draw(context: CanvasRenderingContext2D): void {
        this.lasers = this.lasers.filter(
            (laser: Laser) => laser.y + laser.width > 0 && laser.y <= this.canvas.height
        );

        this.lasers.forEach((laser: Laser): void => laser.draw(context))

        if (this.intervalBetweenShots > 0) {
            this.intervalBetweenShots--;
        }
    }

    fire(x: number, y: number, speed: number, intervalBetweenShots: number = 0): void {
        if (
            0 >= this.intervalBetweenShots &&
            this.maxLasers > this.lasers.length
        ) {
            const laser = new Laser(this.canvas, x, y, speed, this.color);
            this.lasers.push(laser);

            this.intervalBetweenShots = intervalBetweenShots;
        }
    }

    isCollide(entity: any): boolean {
        const index: number = this.lasers.findIndex((laser: Laser) =>
            laser.isCollide(entity)
        );

        if (index >= 0) {
            this.lasers.splice(index, 1);
            return true;
        }

        return false;
    }

    restart(): void {
        this.lasers = [];
    }
}
