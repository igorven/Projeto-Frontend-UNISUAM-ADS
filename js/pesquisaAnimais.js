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

search.addEventListener("input", filterAnimals);

filter.addEventListener("change", filterAnimals);

/* Quando o usuário clicar em "Quero Adotar", o seguinte código deverá ocorrer: */

function queroAdotar(animalName) {

    const usuario = localStorage.getItem("usuarioLogado");

    if (!usuario) {

        mostrarMensagem("mensagemQuero", "Faça login para adotar.");

        return;
    }

    let lista = JSON.parse(localStorage.getItem("queroAdotar")) || [];

    if (lista.includes(animalName)) {

        mostrarMensagem("mensagemQuero", "Animal já selecionado");

        return;
    }

    lista.push(animalName);

    localStorage.setItem("queroAdotar", JSON.stringify(lista));

    atualizarLista();
}

/* A lista de animais escolhidos deverá ser atualizada com a seguinte função: */

function atualizarLista() {

    const lista = JSON.parse(localStorage.getItem("queroAdotar")) || []

    const ul = document.getElementById("listaQueroAdotar");

    ul.innerHTML = "";

    lista.forEach(animal => {

        const li = document.createElement("li");

        li.textContent = animal;

        ul.appendChild(li);
    });
}