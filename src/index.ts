import Ship from "./Ship";
import Lasers from "./Laser";
import './style.css';

interface Position {
    x: number;
    y: number;
}

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    const root: HTMLElement | null = document.getElementById('root');

    if (!root) return;

    root.innerHTML = `
        <div class="container">
            <canvas id="canvas"></canvas>
        </div>
    `;

    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const ship: Ship = new Ship(canvas, {x: 150, y: 130});
    const lasers: Lasers = new Lasers(canvas);

    let animationId: number | null = null;

    const draw = (): void => {
        ship.draw();
        lasers.draw();
        lasers.move();

        if (lasers.lasers.length !== 0) {
            // Планируем следующий кадр анимации
            animationId = requestAnimationFrame(draw);
        } else {
            // Если лазеров нет, останавливаем анимацию
            cancelAnimationFrame(animationId!);
            animationId = null;
        }
    };

    window.addEventListener('keydown', (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'ArrowLeft':
            case 'a':
                ship.move('left');
                break;

            case 'ArrowRight':
            case 'd':
                ship.move('right');
                break;

            case ' ':
                lasers.fire(ship.position);
                break;

            default:
                break;
        }

        if (!animationId) {
            draw();
        }
    });
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

    draw();
});