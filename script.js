let cardContainer = document.querySelector(".card-container");
let campoBusca = document.getElementById("campoBusca");

let jogos = [];

async function carregarJogos() {
    let resposta = await fetch("data.json");
    let dados = await resposta.json();
    jogos = dados.jogos;
    renderizarCards(jogos);
}

function buscarJogos() {
    const termoBusca = campoBusca.value.toLowerCase();
    const jogosFiltrados = jogos.filter(jogo => {
        return jogo.title.toLowerCase().includes(termoBusca);
    });

    renderizarCards(jogosFiltrados);
}

const welcomeScreen = document.getElementById("welcomeScreen");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    mainSection.classList.remove("hidden-section");

    renderizarCards(jogos);
});

function renderizarCards(jogos) {
    cardContainer.innerHTML = "";

    for (let jogo of jogos) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <div class="game-header">
        <img src="${jogo.cover}" alt="Capa do jogo ${jogo.title}" class="game-cover">
        <h2 class="game-title">${jogo.title}</h2>
        </div>
        <div class="game-info">
        <p><strong>Gênero:</strong> <span class="game-genre">${jogo.genre}</span></p>
        <p><strong>Nota:</strong> <span class="game-rating">${jogo.rating}</span></p>
        </div> `;

        article.addEventListener("click", () => {
            abrirModal(jogo);
        });

        cardContainer.appendChild(article);
    }

}

carregarJogos();


function abrirModal(jogo) {
    const modal = document.getElementById("modal");

    document.getElementById("modalCapa").src = jogo.cover;
    document.getElementById("modalTitulo").textContent = jogo.title;
    document.getElementById("modalGenero").textContent = jogo.genre;
    document.getElementById("modalPlataforma").textContent = jogo.platform;
    document.getElementById("modalLancamento").textContent = jogo.release;
    document.getElementById("modalNota").textContent = jogo.rating;
    document.getElementById("modalDescricao").textContent = jogo.descricao || "Sem descrição disponível.";
    document.getElementById("btnSteam").href = jogo.steamLink;
    document.getElementById("btnReview").href = jogo.youtube;

    modal.classList.remove("hidden");
}

document.getElementById("fecharModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});

// Fechar ao clicar fora
document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") {
        document.getElementById("modal").classList.add("hidden");
    }
});
