interface Position {
    x: number;
    y: number;
}

interface Target {
    isHit: boolean;
    position: Position
}

export default class Targets {
    canvas: HTMLCanvasElement
    matrix: (Target)[][];
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.matrix = [];
    }

    createMatrix() {
        const rows = 3;
        const width = 300;
        const height = 30;
        const radius = 3;
        const padding = 10;

        const cols = Math.floor((width + padding) / (2 * radius + padding));

        const startX = (width - cols * (2 * radius + padding) + padding) / 2;

        for (let i = 0; rows > i; i++) {
            const row = [];

            for (let j = 0; cols > j; j++) {
                const x = startX + j * (2 * radius + padding) + radius;
                const y = i * (2 * radius + padding) + radius;

                row.push({
                    isHit: false,
                    position: { x, y }
                });
            }

            this.matrix.push(row);
        }
    }

    draw() {
        const context = this.canvas.getContext("2d");
        if (!context) return;

        context.clearRect(0, 0, this.canvas.width, this.canvas.height / 3);

        for (let row of this.matrix) {
            for (let target of row) {
                if (!target?.isHit) {
                    context.beginPath();
                    context.arc(target.position.x, target.position.y, 3, 0, 2 * Math.PI);
                    context.fillStyle = "red";
                    context.fill();
                }
            }
        }
    }

    hit(rowIndex: number, targetIndex: number): void {
        this.matrix[rowIndex][targetIndex].isHit = true;
        this.draw();
    }
}