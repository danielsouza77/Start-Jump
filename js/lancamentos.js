/**
 * Inicializa a seção de lançamentos.
 */
async function iniciarLancamentos() {
  try {
    // Carrega os lançamentos
    const lancamentos = await carregarDados("./data/lancamentos.json");

    // Renderiza os cards
    renderizarLista(lancamentos, "#lista-lancamentos", criarCardLancamento);

    // Elementos do player
    const loading = document.querySelector("#loading-trailer");
    const elementos = {
      iframe: document.querySelector("#video-lancamento"),
      titulo: document.querySelector("#titulo-lancamento"),
      publisher: document.querySelector("#publisher-lancamento"),
      genero: document.querySelector("#genero-lancamento"),
      plataformas: document.querySelector("#plataformas-lancamento"),
      data: document.querySelector("#data-lancamento"),
      sinopse: document.querySelector("#sinopse-lancamento"),
    };

    // Todos os cards
    const cards = document.querySelectorAll(".card-lancamento");

    /**
     * Atualiza o player com as informações do lançamento.
     * @param {HTMLElement} card
     */
    function atualizarPlayer(card) {
      elementos.iframe.style.opacity = "0";
      loading.style.display = "block";
      elementos.iframe.style.display = "none";

      setTimeout(() => {
        elementos.iframe.src = card.dataset.video;

        elementos.titulo.textContent = card.dataset.titulo;

        elementos.publisher.textContent = card.dataset.publisher;

        elementos.genero.textContent = card.dataset.genero;

        elementos.plataformas.textContent = card.dataset.plataformas;

        elementos.data.textContent = card.dataset.data;

        elementos.sinopse.textContent = card.dataset.sinopse;

        elementos.iframe.onload = () => {
          loading.style.display = "flex";
          loading.style.display = "none";
          elementos.iframe.style.display = "block";
          elementos.iframe.style.opacity = "1";
          elementos.iframe.style.opacity = "1";
        };
      }, 250);
    }

    // Primeiro lançamento
    if (cards.length > 0) {
      const primeiro = cards[0];

      primeiro.classList.add("ativo");

      atualizarPlayer(primeiro);
    }

    // Eventos de clique
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        cards.forEach((c) => c.classList.remove("ativo"));

        card.classList.add("ativo");

        atualizarPlayer(card);

        const player = document.querySelector(".player-lancamento");

        const posicao = player.getBoundingClientRect();

        if (posicao.top < 0 || posicao.bottom > window.innerHeight) {
          player.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  } catch (erro) {
    console.error("Erro ao carregar lançamentos:", erro);
  }
}

iniciarLancamentos();
