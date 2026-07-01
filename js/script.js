const botao = document.getElementById("topo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    botao.style.display = "block";
  } else {
    botao.style.display = "none";
  }
});

botao.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function mostrarNoticia(id, botao) {
  const review = document.getElementById(id);

  if (review.classList.contains("ativa")) {
    review.classList.remove("ativa");
    botao.innerHTML = "Veja mais";
  } else {
    review.classList.add("ativa");
    botao.innerHTML = "Ver menos";
  }
}
