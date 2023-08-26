const html = document.querySelector("html");

const buttons = document.querySelectorAll(".app__card-button");
const focusB = document.querySelector(".app__card-button--foco");
const shortB = document.querySelector(".app__card-button--curto");
const longB = document.querySelector(".app__card-button--longo");

const banner = document.querySelector(".app__image");
const tittle = document.querySelector(".app__title");

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
