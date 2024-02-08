export default class Laser {
    canvas: HTMLCanvasElement
    x: number
    y: number
    width: number
    height: number
    speed: number
    color: string

    constructor(canvas: HTMLCanvasElement, x: number, y: number, speed: number, color: string) {
        this.canvas = canvas;

        this.x = x;
        this.y = y;

        this.width = 5;
        this.height = 20;

        this.speed = speed;

        this.color = color;
    }

    draw(context: CanvasRenderingContext2D): void {
        this.y -= this.speed;

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    isCollide(entity: any): boolean {
        if (
            this.x + this.width > entity.x &&
            this.x < entity.x + entity.width &&
            this.y + this.height > entity.y &&
            this.y < entity.y + entity.height
        ) {
            return true;
        } else {
            return false;
        }
    }
}