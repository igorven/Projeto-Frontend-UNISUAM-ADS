document.getElementById("formCadastro").addEventListener("submit", (e) => {
    e.preventDefault();
});

function login() {

    const login =
        document.getElementById("login").value;

    const senha =
        document.getElementById("senha").value;

    const usuarios =
        JSON.parse(localStorage.getItem("usuario")) || [];

    const usuarioEncontrado = usuarios.find(
        u => u.email === login && u.senha === senha
    );

    if (!usuarioEncontrado) {

        mostrarMensagem("mensagemQuero", "Nenhum usuário cadastrado.");

        return;
    }

    if (usuarioEncontrado) {

        localStorage.setItem("usuarioLogado", usuarioEncontrado.email);

        atualizarUsuario();

        mostrarMensagem("mensagemQuero", "Login realizado com sucesso.");

       setTimeout(() => {
            window.location.href="../index.html";
       }, 500); 

    } else {

        mostrarMensagem("mensagemQuero", "E-mail ou senha incorretos.");

    }

}

function logout() {

    localStorage.removeItem("usuarioLogado");

    atualizarUsuario();

    const login = document.getElementById("login");

    const senha = document.getElementById("senha");

    if (login) login.value = "";

    if (senha) senha.value = "";

    mostrarMensagem("mensagemQuero", "Logout realizado com sucesso.");

}

function atualizarUsuario() {

    const usuario = localStorage.getItem("usuarioLogado");

    const nome = document.getElementById("usuarioLogado");

    const loginButton = document.getElementById("btnLogin");

    const logoutButton = document.getElementById("btnLogout");

    if (usuario) {

        nome.textContent = usuario;

        loginButton.hidden =  true;

        logoutButton.hidden = false;
    }

    else {

        nome.textContent = "Visitante";

        loginButton.hidden = false;

        logoutButton.hidden = true;
    }

}

function mostrarMensagem(id, texto) {

    const elemento = document.getElementById(id);

    if (elemento) {
            elemento.textContent = texto;
    }

}

document.addEventListener("DOMContentLoaded", atualizarUsuario);