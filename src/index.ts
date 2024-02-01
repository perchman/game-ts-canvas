import "./style.css";
import Game from "./Game";

const root: HTMLElement | null = document.getElementById('root');
if (!root) throw new Error('HTMLElement "root" is null');

root.innerHTML = `<canvas id="canvas"></canvas>`;

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game: Game = new Game(canvas);

setInterval(game.play, 1000/60);

// const shipLasersController: LasersController = new LasersController(canvas, 10, 'green');
// const ship: Ship = new Ship(canvas, shipLasersController);
//
// const targetsLasersController: LasersController = new LasersController(canvas, 4, 'red');
// const targetsController: TargetsController = new TargetsController(canvas, targetsLasersController, shipLasersController);
// targetsController.createTargets();

// const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
//
// const background: HTMLImageElement = new Image();
// background.src = dataset.space;

// let isGameOver: boolean = false,
//     isWin: boolean = false;

// const game = (): void => {
//     checkGameOver();
//
//     context.drawImage(background, 0, 0, canvas.width, canvas.height);
//
//     if (!isGameOver) {
//         ship.draw(context);
//         shipLasersController.draw(context);
//         targetsController.draw(context);
//         targetsLasersController.draw(context);
//     } else {
//         displayGameOver();
//     }
// }

// const displayGameOver = (): void => {
//     let text: string = isWin ? "You Win" : "Game Over";
//     let textWidth: number = context.measureText(text).width;
//
//     context.fillStyle = "white";
//     context.font = "70px Arial";
//     context.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2);
// }

// const checkGameOver = (): void => {
//     if (isGameOver) {
//         return;
//     }
//
//     if (targetsLasersController.isCollide(ship)) {
//         isGameOver = true;
//     }
//
//     if (targetsController.isCollide(ship)) {
//         isGameOver = true;
//     }
//
//     if (targetsController.matrix.length === 0) {
//         isWin = true;
//         isGameOver = true;
//     }
// }


// document.addEventListener('DOMContentLoaded', (): void => {
//
// })


// const context = canvas.getContext('2d');




// import ship from "./ship";
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
//     const ship: ship = new ship(canvas, {x: 150, y: 130});
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