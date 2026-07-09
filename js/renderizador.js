/**
 * Carrega qualquer arquivo JSON.
 * @param {string} caminho
 * @returns {Promise<Array>}
 */
async function carregarDados(caminho) {
  try {
    const resposta = await fetch(caminho);

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar ${caminho}: ${resposta.status}`);
    }

    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
}

/**
 * Renderiza uma lista de cards.
 */
function renderizarLista(dados, seletor, criarCard) {
  const container = document.querySelector(seletor);

  if (!container) {
    console.error(`Container "${seletor}" não encontrado.`);
    return;
  }

  container.innerHTML = dados.map(criarCard).join("");
}

/**
 * Procura um item pelo ID.
 */
function buscarPorId(lista, id) {
  return lista.find((item) => item.id === id);
}
