function login() {

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    const usuario =
        JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {

        mostrarMensagem("mensagemQuero", "Nenhum usuário cadastrado.");

        return;
    }

    if (usuario.email === email && usuario.senha === senha) {

        localStorage.setItem("usuarioLogado", usuario.email);

        atualizarUsuario();

        mostrarMensagem("mensagemQuero", "Login realizado com sucesso.");

    } else {

        mostrarMensagem( "mensagemQuero", "E-mail ou senha incorretos.");

    }

}

function logout() {

    localStorage.removeItem("usuarioLogado");

    document.getElementById("usuarioLogado").textContent = "Visitante";

    document.getElementById("email").value = "";

    document.getElementById("senha").value = "";

    mostrarMensagem("mensagemQuero", "Logout realizado com sucesso.");

}

function atualizarUsuario() {

    const usuarioLogado =
        localStorage.getItem("usuarioLogado");

    const campo =
        document.getElementById("usuarioLogado");

    if (!campo) return;

    if (usuarioLogado) {

        campo.textContent = usuarioLogado;

    } else {

        campo.textContent = "Visitante";

    }

}

function mostrarMensagem(id, texto) {

    const elemento = document.getElementById(id);

    if (elemento) {
            elemento.textContent = texto;
    }

}