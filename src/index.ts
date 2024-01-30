import "./style.css";
import TargetsController from "./targets/TargetsController";

const dataset = require('./dataset');

const root: HTMLElement | null = document.getElementById('root');
if (!root) throw new Error('HTMLElement "root" is null');

root.innerHTML = `
        <div class="container">
            <canvas id="canvas"></canvas>
        </div>
    `;

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 600;
canvas.height = 600;

const targetsController: TargetsController = new TargetsController(canvas);
targetsController.createTargets();

const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

const background: HTMLImageElement = new Image();
background.src = dataset.space;

const game = (): void => {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    targetsController.draw(context);
}

setInterval(game, 1000/60);

// document.addEventListener('DOMContentLoaded', (): void => {
//
// })


// const context = canvas.getContext('2d');




// import Ship from "./Ship";
// import Lasers from "./Laser";
// import Targets from "./Targets";
// import './style.css';
//
// interface Position {
//     x: number;
//     y: number;
// }
//
// document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
//     const root: HTMLElement | null = document.getElementById('root');
//
//     if (!root) return;
//
//     root.innerHTML = `
//         <div class="container">
//             <canvas id="canvas"></canvas>
//         </div>
//     `;
//
//     const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
//     const ship: Ship = new Ship(canvas, {x: 150, y: 130});
//     const lasers: Lasers = new Lasers(canvas);
//     const targets: Targets = new Targets(canvas);
//     targets.createMatrix();
//     console.log(targets.matrix);
//     let animationId: number | null = null;
//
//     const draw = (): void => {
//         lasers.draw();
//         lasers.move(targets);
//
//         if (lasers.lasers.length !== 0) {
//             // Планируем следующий кадр анимации
//             animationId = requestAnimationFrame(draw);
//         } else {
//             // Если лазеров нет, останавливаем анимацию
//             cancelAnimationFrame(animationId!);
//             animationId = null;
//         }
//     };
//
//     window.addEventListener('keydown', (event: KeyboardEvent): void => {
//         switch (event.key) {
//             case 'ArrowLeft':
//             case 'a':
//                 ship.move('left');
//                 ship.draw();
//                 break;
//
//             case 'ArrowRight':
//             case 'd':
//                 ship.move('right');
//                 ship.draw();
//                 break;
//
//             case ' ':
//                 lasers.fire(ship.position);
//                 if (!animationId) {
//                     draw();
//                 }
//                 break;
//
//             default:
//                 break;
//         }
//     });
//
//     ship.draw();
//     targets.draw();
//     draw();
// });

//
// let intervalId: NodeJS.Timeout | null = null;

// const draw = (): void => {
//     ship.draw();
//     lasers.draw();
//
//     if (lasers.lasers.length !== 0 && !intervalId) {
//         intervalId = setInterval(() => {
//             lasers.move();
//
//             // Проверяем, есть ли еще активные лазеры, если нет - останавливаем интервал
//             if (lasers.lasers.length === 0) {
//                 clearInterval(intervalId!);
//                 intervalId = null;
//             }
//         }, 500);
//     }
// }