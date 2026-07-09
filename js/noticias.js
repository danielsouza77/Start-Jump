/**
 * Inicializa a página de notícias.
 */
async function iniciarNoticias() {
  try {
    // Carrega os artigos do JSON
    const artigos = await carregarDados("./data/artigos.json");

    // Caso o JSON esteja vazio
    if (!artigos.length) {
      console.warn("Nenhum artigo encontrado.");
      return;
    }

    // Renderiza os cards
    renderizarLista(artigos, "#lista-noticias", criarCardArtigo);
  } catch (erro) {
    console.error("Erro ao iniciar as notícias:", erro);
  }
}

// Inicia a página
iniciarNoticias();
