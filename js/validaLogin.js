const form = document.getElementById("formCadastro");

if (form) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        login();
    });
}


function login() {

    const email =
        document.getElementById("login").value;

    const senha =
        document.getElementById("senha").value;

    const usuarios =
        JSON.parse(localStorage.getItem("usuario")) || [];

    const usuario = usuarios.find(
        u => u.email === email && u.senha === senha
    );

    if (!usuario) {

        mostrarMensagem("mensagemQuero", "Nenhum usuário cadastrado.");

        return;
    }

    if (usuario) {

        localStorage.setItem("usuarioLogado", usuario.email);

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

    if (nome) {
        nome.textContent = usuario || "Visitante";
    }

    if (loginButton) {
        loginButton.hidden =
        !!usuario
    }

    if (logoutButton) {
        logoutButton.hidden = !usuario
    }

}

function mostrarMensagem(id, texto) {

    const elemento = document.getElementById(id);

    if (elemento) {
            elemento.textContent = texto;
    }

}

document.addEventListener("DOMContentLoaded", atualizarUsuario);