// inicia a página recomendaçoes.
async function iniciarReviews() {
  try {
    // carrega as reviews do JSON
    const reviews = await carregarDados("./data/reviews.json");

    // Caso o JSON esteja vazio
    if (!reviews.length) {
      console.warn("Nenhuma review encontrada.");
      return;
    }

    renderizarLista(reviews, "#lista-reviews", criarCardReview);
  } catch (erro) {
    console.erro("Erro ao iniciar as reviews:", erro);
  }
}

iniciarReviews();
