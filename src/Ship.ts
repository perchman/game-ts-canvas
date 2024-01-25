interface Position {
    x: number;
    y: number;
}

export default class Ship {
    canvas: HTMLCanvasElement
    position: Position
    constructor(canvas: HTMLCanvasElement, position: Position) {
        this.canvas = canvas;
        this.position = position;
    }

    move(direction: 'left' | 'right'): void  {
        const context = this.canvas.getContext('2d');
        if (!context) return;

        const newPosition: Position = { ...this.position };

        if (direction === 'left') {
            newPosition.x -= 1;
        } else {
            newPosition.x += 1;
        }

        newPosition.x = Math.max(0, Math.min(this.canvas.width - 3, newPosition.x));
        this.position = newPosition;
    }

    draw(): void {
        const context = this.canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.fillStyle = 'blue';
        context.beginPath();
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(this.position.x - 3, this.position.y + 5);
        context.lineTo(this.position.x + 3, this.position.y + 5);
        context.closePath();
        context.fill();
    }
}