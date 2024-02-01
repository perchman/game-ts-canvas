const dataset = require('./dataset');

const config = {
    ship: {
        width: 49,
        height: 50,
        imageSrc: dataset.ship,
        speed: 3,
        laser: {
            color: 'green',
            speed: 4,
        }
    },
    targets: {
        width: 50,
        height: 50,
        xSpeed: 1,
        ySpeed: 1,
        moveDownTimer: 30,
        imageSrc: dataset.target,
        laser: {
            color: 'red',
            speed: -3,
            laserTimer: 100,
        }
    },
    lasers: {
        width: 5,
        height: 20,
    }
}

export default config