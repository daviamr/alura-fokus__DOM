//Variáveis referente ao html e botões do menu principal
const html = document.querySelector("html");
const buttons = document.querySelectorAll(".app__card-button");
const focusB = document.querySelector(".app__card-button--foco");
const shortB = document.querySelector(".app__card-button--curto");
const longB = document.querySelector(".app__card-button--longo");
//Variáveis referente ao banner e o título principal
const banner = document.querySelector(".app__image");
const tittle = document.querySelector(".app__title");
//Variáveis referente a música e audios
const music = new Audio("assets/sound/luna-rise-part-one.mp3");
music.loop = true;
const audioPlaySound = new Audio("assets/sound/play.wav");
const audioPauseSound = new Audio("assets/sound/pause.mp3");
const audioBeepSound = new Audio("assets/sound/beep.mp3");
const musicButton = document.querySelector("#alternar-musica");
//Variáveis referente ao temporizador
const timeOnScreen = document.querySelector("#timer");
const startTimerButton = document.querySelector("#start-pause");
let elapsedTInSeconds = 1500;
let intervaloId = null;
const startPauseText = document.querySelector("#start-pause-text");
const changeStartPauseIcon = document.querySelector("#start-pause img");

focusB.addEventListener("click", () => {
  elapsedTInSeconds = 1500;
  alterarContexto("foco");
  focusB.classList.add("active");
});

shortB.addEventListener("click", () => {
  elapsedTInSeconds = 300;
  alterarContexto("descanso-curto");
  shortB.classList.add("active");
});

longB.addEventListener("click", () => {
  elapsedTInSeconds = 900;
  alterarContexto("descanso-longo");
  longB.classList.add("active");
});

// Func para automatizar ações através do parametro 'contexto'
function alterarContexto(contexto) {
  mostrarTempo();
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

// feat-Musica
musicButton.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
    music.currentTime = 0;
  }
});

// Evento de click no botão de música
startTimerButton.addEventListener("click", () => {
  iniciarOuPausarContagem();
  if (startPauseText.textContent == "Começar") {
    alteraTexto("Pausar", "pause");
  } else {
    alteraTexto("Começar", "play");
  }
});

// feat-Temporizador
const countdown = () => {
  if (elapsedTInSeconds <= 0) {
    alert("Tempo de descanso esgotado, volte a estudar ;)");
    zerarContagem();
    audioBeepSound.play();
    return;
  }
  elapsedTInSeconds -= 1;
  mostrarTempo();
};

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
function alteraTexto(p, pIcon) {
  startPauseText.textContent = `${p}`;
  if (changeStartPauseIcon) {
    changeStartPauseIcon.setAttribute("src", `/imagens/${pIcon}.png`);
  } else {
    changeStartPauseIcon.setAttribute("src", `/imagens/${pIcon}.png`);
  }
}

// Func para mostrar e formatar o tempo na tela
function mostrarTempo() {
  const tempo = new Date(elapsedTInSeconds * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timeOnScreen.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
