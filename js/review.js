/**
 * Inicializa a página da review.
 */
async function iniciarReview() {
  try {
    // Obtém o ID enviado pela URL
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
      console.error("ID da review não informado.");
      return;
    }

    // Carrega as reviews
    const reviews = await carregarDados("./data/reviews.json");

    // Procura a review pelo ID
    const review = buscarPorId(reviews, id);

    if (!review) {
      console.error("Review não encontrada.");
      return;
    }

    // Seleciona o container
    const container = document.querySelector("#review-container");

    // Renderiza a review
    container.innerHTML = criarReviewCompleta(review);

    // Inicializa os players do YouTube
    iniciarPlayerYoutube();
  } catch (erro) {
    console.error("Erro ao carregar review:", erro);
  }
}

iniciarReview();
