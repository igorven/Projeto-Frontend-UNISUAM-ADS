/* Capta o card do animal em específico usando JQuery */

const buttons = document.querySelectorAll(".btn-adotar");

buttons.forEach(btn => {

    btn.addEventListener("click", () =>{

        queroAdotar(btn.dataset.animal);
    });
});

/* Pesquisa animais na barra de pesquisa e filtra por cards os tipos de animais */

const search = document.getElementById("pesquisa");

const filter = document.getElementById("filtro");

const cards = document.querySelectorAll(".card");

function filterAnimals() {

    const texto = search.value.toLowerCase().trim();

    const categoria = filter.value;

    cards.forEach(card => {

        const conteudo = card.textContent.toLowerCase();

        const tipo = categoria === "todos" || card.classList.contains(categoria);

        const found = conteudo.includes(texto);

        if (found && tipo) {

            card.style.display = "block";
        }

        else {
            card.style.display = "none";
        }
    });
}

function botaoAdocao() {

    const button = document.getElementById("confirmarAdocao");

    const lista = JSON.parse(localStorage.getItem("queroAdotar")) || [];

    button.hidden = lista.length === 0;
}

/* Quando o usuário clicar em "Quero Adotar", o seguinte código deverá ocorrer: */

function queroAdotar(animalName) {

    const usuario = localStorage.getItem("usuarioLogado");

    if (!usuario) {

        mostrarMensagem("mensagemQuero", "Faça login para adotar.");

        return;
    }

    let escolhidos = JSON.parse(localStorage.getItem("queroAdotar")) || [];

    let adotados = JSON.parse(localStorage.getItem("adotados")) || [];

    const alreadyExists = escolhidos.some(a => a.nome === animalName) || adotados.some(a=>a.nome === animalName);

    if(alreadyExists) {

        mostrarMensagem("mensagemQuero", "Esse animal já foi selecionado.")

        return;
    }

    escolhidos.push({

        nome: animalName,

        usuario,

        data: new Date().toLocaleDateString("pt-BR")
    });

    localStorage.setItem("queroAdotar", JSON.stringify(escolhidos));

    atualizarLista();
}

/* A lista de animais escolhidos deverá ser atualizada com a seguinte função: */

function atualizarLista() {

    const lista = JSON.parse(localStorage.getItem("queroAdotar")) || []

    const ul = document.getElementById("listaQueroAdotar");
    
    const msg = document.getElementById("mensagemQuero");

    ul.innerHTML = "";

    lista.forEach(a => {

        const li = document.createElement("li");

        li.textContent = `${a.nome}(${a.data})`;

        ul.appendChild(li);

        msg.textContent = "";

        botaoAdocao();
    });
}

/* Confirma a adoção do animal */

function confirmarAdocao() {

    let lista = JSON.parse(localStorage.getItem("queroAdotar")) || [];

    const msgAdotado = document.getElementById("mensagemAdotados");

    if (lista.length === 0) {

        mostrarMensagem("mensagemQuero", "Nenhum animal selecionado");

        return;
    }

    const confirmar = confirm("Deseja confirmar a adoção?");

    if (!confirmar) {

        return;
    } 
    let adotados = JSON.parse(localStorage.getItem("adotados")) || [];

    adotados.push(...lista);

    localStorage.setItem("adotados", JSON.stringify(adotados));

    localStorage.removeItem("queroAdotar");

    msgAdotado.textContent = "";

    atualizarLista();

    atualizarAdotados();

    ocultarCards();
}

/* Atualiza a quantidade de animais adotados */

function atualizarAdotados() {

    const lista = JSON.parse(localStorage.getItem("adotados")) || [];

    const ul = document.getElementById("listaAdotados");

    ul.innerHTML = "";

    lista.forEach(a => {

        const li = document.createElement("li");

        li.textContent = `${a.nome} - Adotado em ${a.data}`;

        ul.appendChild(li);
    });
}

/* Após o animais serem adotados, ocultar o card do animal em si */

function ocultarCards() {

    const adotados = JSON.parse(localStorage.getItem("adotados")) || [];

    document.querySelectorAll(".card").forEach(card =>{

        const nome = card.querySelector("h3").textContent;

        const exists = adotados.some(a => a.nome === nome);

        if (exists) {

            card.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    atualizarLista();

    atualizarAdotados();

    ocultarCards();

    botaoAdocao();

});
