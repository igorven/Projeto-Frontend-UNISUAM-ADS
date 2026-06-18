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

        const nome = card.querySelector("h3").textContent.toLowerCase();

        const categoriaOk = categoria === "todos" || card.classList.contains(categoria);

        const textoOk = nome.includes(texto);

        card.style.display = textoOk && categoriaOk ? "" : "none";
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

    const usuarios = JSON.parse(localStorage.getItem("usuario")) || [];

    const todosAdotados = usuarios.flatMap(u => u.adocoes || []);

    const alreadyExists = escolhidos.some(a => a.nome === animalName) || todosAdotados.some(a=>a.nome === animalName);

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

    const lista = JSON.parse(localStorage.getItem("queroAdotar")) || [];

    if (lista.length === 0) {
        mostrarMensagem("mensagemQuero", "Nenhum animal selecionado");

        return;
    }
    
    else {
        mostrarMensagem("mensagemQuero", "");
    }

    if (!confirm("Deseja confirmar?")) {
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuario")) || [];

    const logado = localStorage.getItem("usuarioLogado");

    const usuario = usuarios.find(u => u.email === logado);

    if (usuario) {

        usuario.adocoes.push(...lista);

        localStorage.setItem("usuario", JSON.stringify(usuarios))
    }

    localStorage.removeItem("queroAdotar");

    atualizarLista();

    atualizarAdotados();

    ocultarCards();

    botaoAdocao();
}

/* Atualiza a quantidade de animais adotados */

function atualizarAdotados() {

    const usuarios = JSON.parse(localStorage.getItem("usuario")) || [];

    const ul = document.getElementById("listaAdotados");

    ul.innerHTML = "";

    usuarios.forEach(u => {
        (u.adocoes || []).forEach(a => {
            const li = document.createElement("li");

            li.textContent = `${a.nome} - adotado(a) por ${u.nome}`;

            ul.appendChild(li);
        });
    });
}

/* Após o animais serem adotados, ocultar o card do animal em si */

function ocultarCards() {

    const usuarios = JSON.parse(localStorage.getItem("usuario")) || [];

    const adotados = usuarios.flatMap(u => u.adocoes || []);

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

    filterAnimals();

});
