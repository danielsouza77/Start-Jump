/**
 * Limita o tamanho de um texto.
 * @param {string} texto
 * @param {number} limite
 * @returns {string}
 */
function limitarTexto(texto, limite) {
  if (texto.length <= limite) {
    return texto;
  }
  return texto.slice(0, limite) + "...";
}

// Componentes ARTIGOS

/**
 * Cria o card de um artigo.
 * @param {Object} artigo Dados do artigo.
 * @returns {string}
 */
function criarCardArtigo(artigo) {
  return `
        <article class="card-noticias">
            <img
                src="${artigo.imagem}"
                alt="${artigo.titulo}"
                  width="600"
    height="338"
                 loading="lazy"
    decoding="async"
            >
            <div class="texto-noticias">
                <h2>${artigo.titulo}</h2>
                <p>
                    ${limitarTexto(artigo.descricao, 140)}
                </p>
                <a
                    class="botao"
                    href="./artigo.html?id=${artigo.id}"
                >
                    Leia a matéria
                </a>
            </div>
        </article>

    `;
}

function criarArtigoCompleto(artigo) {
  const conteudo = artigo.conteudo
    .map((bloco) => {
      switch (bloco.tipo) {
        case "titulo":
          return `
            <h2 class="titulo-conteudo">
              ${bloco.texto}
            </h2>
          `;

        case "paragrafo":
          return `
            <p>
              ${bloco.texto}
            </p>
          `;

        case "imagem":
          return `
            <img
              src="${bloco.src}"
              alt="${bloco.alt}"
              class="imagem-conteudo"
                 width="1200"
    height="675"
               loading="lazy"
    decoding="async"
            >
          `;

        case "video":
          return criarPlayerYoutube(bloco, artigo.titulo);

        case "lista":
          return `
            <section class="lista-conteudo">
              <h3>${bloco.titulo}</h3>
              <ul>
                ${bloco.itens.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          `;

        case "listas":
          return `
    <section class="listas-conteudo">

      <h2 class="titulo-conteudo">
        ${bloco.titulo}
      </h2>

      <div class="listas-grid">

        ${bloco.listas
          .map(
            (lista) => `
          <div class="lista-card">

            <img
              src="${lista.src}"
              alt="${lista.titulo}"
              class="imagem-lista"
              width="900"
    height="1200"
               loading="lazy"
    decoding="async"
            >

            <div class="overlay-lista">

              <h3>${lista.titulo}</h3>

              <ul>
                ${lista.itens.map((item) => `<li>${item}</li>`).join("")}
              </ul>

            </div>

          </div>
        `,
          )
          .join("")}

      </div>

    </section>
  `;

        default:
          console.warn(`Tipo de bloco desconhecido: ${bloco.tipo}`);
          return "";
      }
    })
    .join("");

  return `
    <article class="artigo">

    <div class="conteudo-artigo">

        <span class="categoria-artigo">
            ${artigo.categoria}
        </span>

        <h1>${artigo.tituloCard || artigo.titulo}</h1>

       ${criarAutor(artigo)}

    </div>

    <img
        class="banner-artigo"
        src="${artigo.banner}"
        alt="${artigo.titulo}"
         width="1400"
    height="700"
         loading="lazy"
    decoding="async"
    >

    <div class="conteudo-artigo">

        ${conteudo}

    </div>

    </article>

  `;
}

// Componentes REVIEWS

/**
 * Cria o card de uma review.
 * @param {Object} review
 * @returns {string}
 */
function criarCardReview(review) {
  return `
    <article class="card-recomendacao">

      <img
        src="${review.imagem}"
        alt="${review.titulo}"
        width="600"
         height="338"
         loading="lazy"
    decoding="async"
    fetchpriority="high"
      >

      <div class="texto-recomendacao">

        <h2 class="titulo-card-review">
          ${review.tituloCard || review.titulo}
        </h2>

        <p>
          ${review.descricao}
        </p>

        <a
          class="botao"
          href="./review.html?id=${review.id}"
        >
          Ver Review
        </a>

      </div>

    </article>
  `;
}

/**
 * Cria a página completa de uma review.
 * @param {Object} review
 * @returns {string}
 */

/**
 * Cria a página completa de uma review.
 * @param {Object} review
 * @returns {string}
 */
function criarReviewCompleta(review) {
  const conteudo = review.conteudo
    .map((bloco) => {
      switch (bloco.tipo) {
        case "titulo":
          return `
            <h2 class="titulo-conteudo">
              ${bloco.texto}
            </h2>
          `;

        case "paragrafo":
          return `
    ${
      bloco.subtitulo
        ? `<h3 class="subtitulo-conteudo">${bloco.subtitulo}</h3>`
        : ""
    }

    <p>
      ${bloco.texto}
    </p>
  `;

        case "imagem":
          return `
            <img
              src="${bloco.src}"
              alt="${bloco.alt}"
              class="imagem-conteudo"
              width="1200"
    height="675"
              loading="lazy"
              decoding="async"
            >
          `;

        case "video":
          return criarPlayerYoutube(bloco, review.titulo);

        case "listas":
          return `
    <div class="listas-grid-review">

      ${bloco.listas
        .map(
          (lista) => `
            <div class="lista-card-review">

             ${
               lista.src
                 ? `
                 <img
                 src="${lista.src}"
                 alt="${lista.titulo || ""}"
                 class="imagem-lista-review"
                 width="900"
    height="1200"
                  loading="lazy"
    decoding="async"
                 >
                  `
                 : ""
             }

              <div class="overlay-review">

                ${lista.titulo ? `<h3>${lista.titulo}</h3>` : ""}

                <ul>
                  ${lista.itens.map((item) => `<li>${item}</li>`).join("")}
                </ul>

              </div>

            </div>
          `,
        )
        .join("")}

    </div>
  `;

        default:
          return "";
      }
    })
    .join("");

  // Pontos positivos (opcional)
  const positivos = review.pontosPositivos?.length
    ? `
      <div class="pontos-positivos">

        <h2>Pontos Positivos</h2>

        <ul>

          ${review.pontosPositivos.map((item) => `<li>${item}</li>`).join("")}

        </ul>

      </div>
    `
    : "";

  // Pontos negativos (opcional)
  const negativos = review.pontosNegativos?.length
    ? `
      <div class="pontos-negativos">

        <h2>Pontos Negativos</h2>

        <ul>

          ${review.pontosNegativos.map((item) => `<li>${item}</li>`).join("")}

        </ul>

      </div>
    `
    : "";

  return `

    <article class="review">

      <div class="cabecalho-review">

        <span class="categoria-review">
          ${review.categoria}
        </span>

      <h1 class="titulo-review">
    ${review.titulo}
</h1>

        ${criarAutor(review)}

        <div class="detalhes-review">

          <span>
            ⭐ ${review.nota}
          </span>

          <span>
            ${review.desenvolvedora}
          </span>

          <span>
            ${review.genero}
          </span>

          <span>
            ${review.plataformas.join(", ")}
          </span>

        </div>

      </div>

      <img
        class="banner-review"
        src="${review.banner}"
        alt="${review.titulo}"
        width="1400"
    height="700"
         loading="lazy"
    decoding="async"
      >

      <div class="conteudo-review">

        ${conteudo}

        ${
          review.pontosPositivos?.length || review.pontosNegativos?.length
            ? `
          <section class="avaliacao">

            ${positivos}

            ${negativos}

          </section>
        `
            : ""
        }

      </div>

    </article>

  `;
}
/**
 * Cria o componente de autor.
 * @param {Object} dados
 * @returns {string}
 */
function criarAutor(dados) {
  return `
    <div class="autor-conteudo">

      <img
        src="${dados.fotoautor}"
        alt="${dados.autor}"
        class="foto-autor"
        width="120"
    height="120"
         loading="lazy"
    decoding="async"
      >

      <span class="nome-autor">
       Por ${dados.autor}
      </span>

      <span class="data-autor">
        • ${dados.data}
      </span>

    </div>
  `;
}

/**
 * Cria um card de lançamento.
 * @param {Object} lancamento
 * @returns {string}
 */
function criarCardLancamento(lancamento) {
  return `

        <article
            class="card-lancamento"

            data-video="${lancamento.video}"

            data-titulo="${lancamento.titulo}"
            
            data-publisher="${lancamento.publisher}"
 
            data-genero="${lancamento.genero}"
            
            data-data="${lancamento.data}"

            data-plataformas="${lancamento.plataformas.join(" • ")}"

           data-sinopse="${lancamento.sinopse}"
             


        >

            <img
                src="${lancamento.imagem}"
                alt="${lancamento.titulo}"
                class="imagem-lancamento"
                  width="1600"
    height="900"
                 loading="lazy"
    decoding="async"
            >

            <div class="overlay-lancamento">

                <h4>

                    ${lancamento.titulo}

                </h4>

                <span>

                    ${lancamento.data}

                </span>

            </div>

        </article>

    `;
}

/**
 * Cria um player do YouTube utilizando a thumbnail oficial.
 * @param {Object} bloco
 * @param {string} titulo
 * @returns {string}
 */

/**
 * Extrai o ID de qualquer URL do YouTube.
 */

function extrairIdYoutube(url) {
  try {
    const u = new URL(url);

    // https://youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.substring(1);
    }

    // https://youtube.com/watch?v=VIDEO_ID
    if (u.searchParams.has("v")) {
      return u.searchParams.get("v");
    }

    // https://youtube.com/embed/VIDEO_ID
    if (u.pathname.includes("/embed/")) {
      return u.pathname.split("/embed/")[1];
    }

    return "";
  } catch {
    return "";
  }
}

function criarPlayerYoutube(bloco, titulo) {
  // Extrai o ID do vídeo
  const videoId = extrairIdYoutube(bloco.src);

  // Thumbnail em alta resolução
  const thumbMax = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  // Thumbnail padrão (caso a maxres não exista)
  const thumbHQ = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return `

    <div
      class="youtube-player"
      data-video="${bloco.src}"
    >

      <img

        src="${thumbMax}"

        data-fallback="${thumbHQ}"

        alt="${titulo}"

        class="youtube-thumb"

        loading="lazy"

        decoding="async"

      >

      <button

        class="youtube-play"

        aria-label="Assistir vídeo"

      >

        ▶

      </button>

    </div>

  `;
}

/**
 * Inicializa todos os players do YouTube.
 */

/**
 * Converte qualquer URL do YouTube para o formato Embed.
 */
function converterParaEmbed(url) {
  const id = extrairIdYoutube(url);

  return `https://www.youtube-nocookie.com/embed/${id}`;
}

function iniciarPlayerYoutube() {
  const players = document.querySelectorAll(".youtube-player");

  players.forEach((player) => {
    // Corrige thumbnails que não possuem maxresdefault
    const imagem = player.querySelector(".youtube-thumb");

    imagem.onerror = function () {
      this.src = this.dataset.fallback;
    };

    player.addEventListener("click", () => {
      if (player.dataset.loaded) return;

      player.dataset.loaded = "true";

      const separador = player.dataset.video.includes("?") ? "&" : "?";

      player.innerHTML = `

        <iframe

          width="100%"

          height="650"

       src="${converterParaEmbed(player.dataset.video)}?autoplay=1"

          title="YouTube"

          loading="lazy"

          frameborder="0"

          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

          referrerpolicy="strict-origin-when-cross-origin"

          allowfullscreen

        ></iframe>

      `;
    });
  });
}
