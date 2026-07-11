/**
 * Inicializa a página do artigo.
 */
async function iniciarArtigo() {
  try {
    // Obtém o ID enviado pela URL
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
      console.error("ID do artigo não informado.");
      return;
    }

    // Carrega o JSON
    const artigos = await carregarDados("./data/artigos.json");

    // Procura o artigo pelo ID
    const artigo = buscarPorId(artigos, id);

    if (!artigo) {
      console.error("Artigo não encontrado.");
      return;
    }

    // Seleciona o container
    const container = document.querySelector("#artigo-container");

    // Renderiza o artigo
    container.innerHTML = criarArtigoCompleto(artigo);

    // Inicializa o player do YouTube
    iniciarPlayerYoutube();
  } catch (erro) {
    console.error("Erro ao carregar artigo:", erro);
  }
}

iniciarArtigo();
