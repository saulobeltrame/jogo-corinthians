alert("Para jogar é só clicar no simbolo para elimina-lo, ao final do tempo mostrará sua pontuação");
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 550,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerId: null, // Inicializa como null
        countDownTimerId: null, // Inicializa como null
    }
};


function countDown(){
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Seu tempo acabou! Você eliminou: " + state.values.result + " lixos");
    }
}

function playSound(){
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
        square.addEventListener("mousedown", () => { // Usa mousedown para dispositivos móveis
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }

        });
    });
}

function init() {
    addListenerHitBox();
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity); // Inicia o timer aqui
    state.actions.countDownTimerId = setInterval(countDown, 1000);  // Inicia o timer aqui

}


init();