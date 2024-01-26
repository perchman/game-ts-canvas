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
    matrix: (Position | null)[][];
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.matrix = [];
    }

    createMatrix() {
        const rows = 4;
        const width = 300; // Ширина холста
        const height = 30; // Высота холста
        const radius = 3; // Радиус цели
        const padding = 10; // Расстояние между целями

        const cols = Math.floor((width - padding) / (2 * radius + padding));
        const actualPadding = (width - cols * 2 * radius) / (cols - 1);

        const xOffset = (width - cols * (2 * radius + actualPadding)) / 2;
        const yOffset = (height - rows * (2 * radius + padding)) / 2;

        for (let i = 0; i < rows; i++) {
            const row = [];

            for (let j = 0; j < cols; j++) {
                const x = j * (2 * radius + actualPadding) + xOffset;
                const y = i * (2 * radius + padding) + yOffset;

                const target = { x, y };

                row.push(target);
            }

            this.matrix.push(row);
        }
    }

    draw() {
        const context = this.canvas.getContext("2d");
        if (!context) return;

        const matrixWidth = this.matrix.length > 0 ? this.matrix[0].length * 10 : 0;
        const matrixHeight = this.matrix.length * 10;

        context.clearRect(0, 0, 300, 30);

        for (let row of this.matrix) {
            for (let target of row) {
                if (target) {
                    context.beginPath();
                    context.arc(target.x, target.y, 3, 0, 2 * Math.PI);
                    context.fillStyle = "red";
                    context.fill();
                    context.stroke();
                }
            }
        }
    }

    hit(rowIndex: number, targetIndex: number): void {
        this.matrix[rowIndex][targetIndex] = null;
        this.draw();
    }
}