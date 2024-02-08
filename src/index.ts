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