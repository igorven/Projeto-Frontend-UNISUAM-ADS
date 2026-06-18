
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

function mostrarMensagem(
    id,
    texto
    ){
    
    const elemento =
    document.getElementById(
    id
    );
    
    if(elemento){
    
    elemento.textContent =
    texto;
    
    }
    
}

function filterAnimals() {

    const texto =
    search.value
    .toLowerCase()
    .trim();
    
    const categoria =
    filter.value;
    
    const usuarios =
    
    JSON.parse(
    localStorage.getItem(
    "usuario"
    )
    
    )||[];
    
    /* pega todos animais adotados */
    
    const adotados =
    
    usuarios.flatMap(
    u =>
    u.adocoes || []
    );
    
    cards.forEach(card=>{
    
    const nome =
    
    card
    .querySelector(
    "h3"
    )
    .textContent
    .toLowerCase();
    
    const categoriaOk =
    
    categoria === "todos"
    
    ||
    
    card.classList.contains(
    categoria
    );
    
    const textoOk =
    nome.includes(texto);
    
    /* verifica se já foi adotado */
    
    const adotado =
    
    adotados.some(
    a=>
    a.nome.toLowerCase()
    === nome
    );
    
    /* só mostra se não estiver adotado */
    
    card.style.display =
    
    textoOk &&
    categoriaOk &&
    !adotado
    
    ?
    
    ""
    
    :
    
    "none";
    });
}

search.addEventListener(
    "input",
    filterAnimals
    );
    
    filter.addEventListener(
    "change",
    filterAnimals
    );


/* Quando o usuário clicar em "Quero Adotar", o seguinte código deverá ocorrer: */

function queroAdotar(animalName) {

    const emailLogado = localStorage.getItem("usuarioLogado");

    if (!emailLogado) {

        mostrarMensagem("mensagemQuero", "Faça login para adotar.");

        return;
    }


    const usuarios = JSON.parse(localStorage.getItem("usuario")) || [];

    const usuario = usuarios.find(u => u.email === emailLogado);

    if (!usuario) {

        mostrarMensagem("mensagemQuero", "Usuário não encontrado")

        return;
    }

    const todosAdotados = usuarios.flatMap(u => u.adocoes || []);

    const alreadyExists = todosAdotados.some(a => a.nome === animalName);

    if(alreadyExists) {

        mostrarMensagem("mensagemQuero", "Esse animal já foi selecionado.")

        return;
    }

    document.getElementById("animalSelecionado").value = animalName;

    document.getElementById("nomeAdotante").value = usuario.nome;

    document.getElementById("emailAdotante").value = usuario.email;

    document.getElementById("telefoneAdotante").value = usuario.telefone || "";

    document.getElementById("modalAdocao").style.display = "flex";

    mostrarMensagem("mensagemQuero", "");
}


function botaoAdocao(){

    const botao =
    document.getElementById(
    "confirmarAdocao"
    );
    
    if(!botao) return;
    
    const usuario =
    localStorage.getItem(
    "usuarioLogado"
    );
    
    botao.hidden = !usuario;
    
}

/* A lista de animais escolhidos deverá ser atualizada com a seguinte função: */

function atualizarLista() {


        const email =
        
        localStorage.getItem(
        "usuarioLogado"
        );
        
        
        const ul =
        
        document.getElementById(
        "listaQueroAdotar"
        );
        
        
        const msg =
        
        document.getElementById(
        "mensagemQuero"
        );
        
        
        ul.innerHTML = "";
        
        
        if(!email){
        
        msg.textContent =
        "Faça login para visualizar suas solicitações.";
        
        return;
        
        }
        
        
        const usuarios =
        
        JSON.parse(
        localStorage.getItem(
        "usuario"
        )
        
        )||[];
        
        
        const usuario =
        
        usuarios.find(
        u =>
        u.email === email
        );
        
        
        if(
        !usuario ||
        !usuario.adocoes ||
        usuario.adocoes.length === 0
        ){
        
        msg.textContent =
        "Nenhuma solicitação enviada.";
        
        return;
        
        }
        
        
        msg.textContent = "";
        
        
        usuario.adocoes.forEach(a=>{
        
        const li =
        
        document.createElement(
        "li"
        );
        
        
        li.textContent =
        
        `${a.nome}
        (
        ${a.data}
        )`;
        
        
        ul.appendChild(
        li
        );
        
        });

    botaoAdocao();
    
    }

/* Confirma a adoção do animal */

function confirmarAdocao() {

    const animal =

document
.getElementById(
"animalSelecionado"
)
.value;


const motivo =

document
.getElementById(
"motivo"
)
.value
.trim();


if(!motivo){

mostrarMensagem(
"mensagemAdocao",
"Explique o motivo da adoção."
);

return;

}


const usuarios =

JSON.parse(
localStorage.getItem(
"usuario"
)

)||[];


const email =

localStorage.getItem(
"usuarioLogado"
);


const usuario =

usuarios.find(
u =>
u.email === email
);


if(!usuario){

return;

}


if(!usuario.adocoes){

usuario.adocoes = [];

}

const jaExiste =
usuario.adocoes.some(
a=>
a.nome===animal
);

if(jaExiste){

mostrarMensagem(
"mensagemAdocao",
"Você já solicitou esse animal."
);

return;

}


usuario.adocoes.push({

nome:animal,

motivo:motivo,

data:

new Date()

.toLocaleDateString(
"pt-BR"
)

});


localStorage.setItem(

"usuario",

JSON.stringify(
usuarios
)

);


document
.getElementById(
"modalAdocao"
)

.style.display =
"none";


document
.getElementById(
"formAdocao"
)

.reset();

mostrarMensagem(
    "mensagemAdocao",
    ""
    );


atualizarLista();

atualizarAdotados();

filterAnimals();

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

    filterAnimals();
}

document.addEventListener("DOMContentLoaded", () => {
    
    const form =

document.getElementById(
"formAdocao"
);

if(form){

form.addEventListener(
"submit",

(e)=>{

e.preventDefault();

confirmarAdocao();

});

}


atualizarLista();

atualizarAdotados();

filterAnimals();


document
.getElementById(
"cancelarAdocao"
)

.addEventListener(
"click",

()=>{

document
.getElementById(
"modalAdocao"
)

.style.display =
"none";

/* limpa formulário */

document
.getElementById(
"formAdocao"
)

.reset();

/* limpa mensagem */

mostrarMensagem(
"mensagemAdocao",
""
);

});

});
