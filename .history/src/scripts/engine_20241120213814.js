const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives-display")
    },
    values: {
        gameVelocity: 550,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3
    },
    actions: {
        timerId: setInterval(randomSquare, 550),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();
    }
}

function playSound() {
    let audio = new Audio("./src/audios/Tirosniper1.mp3");
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else {
                state.values.lives--;
                state.view.lives.textContent = "x" + state.values.lives;

                if (state.values.lives <= 0) {
                    gameOver();
                }
            }
        });
    });
}

function gameOver() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! Você eliminou: " + state.values.result + " lixos");
}

function init() {
    addListenerHitBox();
}

init();