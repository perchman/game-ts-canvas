import Explosion from "./Explosion";

export default class ExplosionsController {
    explosions: Explosion[]
    maxFrame: number

    constructor() {
        this.explosions = [];
        this.maxFrame = 24;
    }

    draw(context: CanvasRenderingContext2D): void {
        this.explosions = this.explosions.filter((explosion: Explosion): boolean => this.maxFrame >= explosion.countFrame)

        this.explosions.forEach((explosion: Explosion) => explosion.draw(context));
    }

    createExplosion(x: number, y: number): void {
        this.explosions.push(new Explosion(x, y, this.maxFrame));
    }
}