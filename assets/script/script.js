const html = document.querySelector("html");

const buttons = document.querySelectorAll(".app__card-button");
const focusB = document.querySelector(".app__card-button--foco");
const shortB = document.querySelector(".app__card-button--curto");
const longB = document.querySelector(".app__card-button--longo");

const banner = document.querySelector(".app__image");
const tittle = document.querySelector(".app__title");

const music = new Audio("assets/sound/luna-rise-part-one.mp3");
music.loop = true;
const audioPlaySound = new Audio("assets/sound/play.wav");
const audioPauseSound = new Audio("assets/sound/pause.mp3");
const audioBeepSound = new Audio("assets/sound/beep.mp3");
const musicButton = document.querySelector("#alternar-musica");

const timer = document.querySelector("#timer");
const startTimerButton = document.querySelector("#start-pause");
let elapsedTInSeconds = 5;
let intervaloId = null;

const startPauseText = document.querySelector("#start-pause-text");

focusB.addEventListener("click", () => {
  alterarContexto("foco");
  focusB.classList.add("active");
});

shortB.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  shortB.classList.add("active");
});

longB.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longB.classList.add("active");
});

function alterarContexto(contexto) {
  buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      tittle.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;

      break;
    case "descanso-curto":
      tittle.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

      break;
    case "descanso-longo":
      tittle.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;

      break;

    default:
      console.log("Nenhum texto encontrado.");
      break;
  }
}

// Music

musicButton.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
    music.currentTime = 0;
  }
});

// Temporizador
const countdown = () => {
  if (elapsedTInSeconds <= 0) {
    zerarContagem();
    alteraTexto("Começar");
    alert("Tempo de descanso esgotado, volte a estudar ;)");
    audioBeepSound.play();
    return;
  }
  elapsedTInSeconds -= 1;
  console.log("Temporizador:" + elapsedTInSeconds);
};

// Evento de click no botão de música
startTimerButton.addEventListener("click", () => {
  iniciarOuPausarContagem();
  if (startPauseText.textContent == "Começar") {
    alteraTexto("Pausar");
  } else {
    alteraTexto("Começar");
  }
});

// Func Inciar e Pausar contagem
function iniciarOuPausarContagem() {
  if (intervaloId) {
    zerarContagem();
    audioPauseSound.play();
    return;
  }

  audioPlaySound.play();
  intervaloId = setInterval(countdown, 1000);
}

// Func Zerar Contagem
function zerarContagem() {
  clearInterval(intervaloId);
  intervaloId = null;
}

// Func Alterar texto do button
function alteraTexto(parametro) {
  startPauseText.textContent = `${parametro}`;
}
