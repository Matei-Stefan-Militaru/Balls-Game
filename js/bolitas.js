/**
 * 
 */
window.onload = main;

/**
 * 
 */
const NUM = 5
const COLORS = ['yellow', 'blue']
var TIME = 1000

/**
 * 
 */
function main() {
    createBalls()
    generatePlay()
    changeTempoColor()
    addClickListeners()
}

/**
 * 
 */
function createBalls() {
    box = document.getElementById('box')

    for (let i = 0; i < COLORS.length; i++) {
        for (let j = 0; j < NUM; j++) {
            let ball = document.createElement('div')
            ball.classList.add('ball')
            ball.classList.add(COLORS[i])
            box.appendChild(ball)
        }
    }
}

/**
 * Function that uses the Math.random function to obtain a random color
 * from the COLORS aray
 * 
 * @returns 
 */

function getRandomDefinedColor() {
    return COLORS[Math.round(Math.random() * (COLORS.length - 1))];
}

/**
 * 
 */
function changeTempoColor() {
    tempo = document.getElementById('tempo');
    tempo.classList.add('ball');
    tempo.classList.add(COLORS[0])
    parar = setInterval(() => {
        COLORS.forEach(color => tempo.classList.remove(color));
        tempo.classList.add(getRandomDefinedColor());
        //TIME = TIME - Math.random() * (500 - 100)
        // Delete this console.log
        console.log(TIME)
        /*
        if (TIME < 0) {
            const message = document.createElement('div');
            message.id = 'lose';
            message.innerHTML = `
            <h1>¡YOU HAVE LOST!</h1>
            <p>Your time is up. Please try again</p>
            <button onclick="location.reload()">Jugar otra vez</button>
        `;
            document.body.appendChild(message);
        }
        */

    }, TIME);

}


/**
 * Paso 2
 */
function addClickListeners() {

    box.addEventListener('click', (e) => {
        if (e.target.classList.contains('ball')) {
            checkColorMatch(e.target);
        }
    });
}






function checkColorMatch(clickedBall) {
    const tempo = document.getElementById('tempo');
    const tempoColor = COLORS.find(color => tempo.classList.contains(color));
    const ballColor = COLORS.find(color => clickedBall.classList.contains(color));

    if (tempoColor === ballColor) {
        const sameBalls = document.querySelectorAll(`.${ballColor}`);

        sameBalls.forEach(ball => {

            if (ball.id !== 'tempo') {
                ball.style.transform = 'scale(2)';

                setTimeout(() => {
                    ball.style.transform = 'scale(0)';
                }, 500);

                setTimeout(() => {
                    ball.remove();
                    // Verificar si el juego ha terminado después de eliminar cada bola
                    checkGameComplete();
                }, 1000);
            }
        });
    }
}






/**
 * 
 */

function generatePlay() {

    ballSize = document.getElementsByClassName('ball')[0].offsetWidth
    border = getComputedStyle(box).borderWidth.slice(0, -2) * 2

    minWidth = 0, minHeight = 0
    maxWidth = box.offsetWidth - ballSize - border
    maxHeight = box.offsetHeight - ballSize - border

    x = 0, y = 0

    balls = document.getElementsByClassName('ball')

    // console.log(balls)

    for (let ball of balls) {

        let x = Math.random() * maxWidth
        let y = Math.random() * maxHeight

        let xSpeed = Math.random() * (5 - 1) + 1
        let ySpeed = Math.random() * (5 - 1) + 1

        ball.style.left = `${x}px`
        ball.style.top = `${y}px`

        function moveBall() {
            if (x <= 0 || x >= maxWidth)
                xSpeed = -xSpeed

            if (y <= 0 || y >= maxHeight)
                ySpeed = -ySpeed

            x += xSpeed
            y += ySpeed

            ball.style.left = `${x}px`
            ball.style.top = `${y}px`
        }

        time = setInterval(moveBall, 20)
    }
}



















/**
 * Paso 3
 */

function checkGameComplete() {
    const box = document.getElementById('box');
    const remainingBalls = box.getElementsByClassName('ball');

    if (remainingBalls.length === 0) {
        // Eliminar el div box y el tempo
        box.remove();
        document.getElementById('tempo').remove();

        // Crear y mostrar mensaje de felicitación
        const message = document.createElement('div');
        message.id = 'congratulations';
        message.innerHTML = `
            <h1>¡Felicitaciones!</h1>
            <p>Has eliminado todas las bolas correctamente</p>
            <button onclick="location.reload()">Jugar otra vez</button>
        `;
        document.body.appendChild(message);
    }
}

/**
 * Paso 2
 */
function addClickListeners() {
    const box = document.getElementById('box');
    box.addEventListener('click', (e) => {
        if (e.target.classList.contains('ball')) {
            checkColorMatch(e.target);
        }
    });
}

function checkColorMatch(clickedBall) {
    const tempo = document.getElementById('tempo');
    const tempoColor = COLORS.find(color => tempo.classList.contains(color));
    const ballColor = COLORS.find(color => clickedBall.classList.contains(color));

    if (tempoColor === ballColor) {
        const sameBalls = document.querySelectorAll(`.${ballColor}`);

        sameBalls.forEach(ball => {
            if (ball.id !== 'tempo') {
                ball.style.transform = 'scale(2)';

                setTimeout(() => {
                    ball.style.transform = 'scale(0)';
                }, 500);

                setTimeout(() => {
                    ball.remove();
                    // Verificar si el juego ha terminado después de eliminar cada bola
                    checkGameComplete();
                }, 1000);
            }
        });
    }
}


