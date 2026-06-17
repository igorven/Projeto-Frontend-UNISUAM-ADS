const form = document.getElementById("formCadastro");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarUsuario();
});

/*== Elementos do formulário de cadastro ==*/
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const mensagem = document.getElementById("mensagemCadastro");

/*== Mensagem ==*/
function mostrarMensagem(texto, cor = "green") {

    mensagem.textContent = texto;
    mensagem.style.color = cor;

}

/*== Máscara do CPF ==*/
cpf.addEventListener("input", () => {

    let valor = cpf.value.replace(/\D/g, "");

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpf.value = valor;

});

/**== CPF ==*/


cpf.addEventListener("blur", () => {

    const erroCpf = document.getElementById("erroCpf")
    if(validarCPF(cpf.value)) {
        erroCpf.textContent = "CPF válido.";
        cpf.classList.add("input-ok");
    }

    else {
        erroCpf.textContent = "CPF inválido.";
    }
})

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');

    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        { resto = 0 };
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        { resto = 0 };

    return resto === parseInt(cpf.charAt(10));
}

/**== CEP (utilizando o API ViaCEP) ==*/
cep.addEventListener("input", findCEP)


function findCEP() {
    let cepValor = cep.value.replace(/\D/g, "");

    if (cepValor.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cepValor}/json/`)
        .then(res => res.json())
        .then(data => {

            if (data.erro) {
                mostrarMensagem("CEP não encontrado", "red");
                return;
            }

            rua.value = data.logradouro || "";
            bairro.value = data.bairro || "";
            cidade.value = data.localidade || "";
            estado.value = data.uf || "";

        })
        .catch(() => {
            mostrarMensagem("Erro ao buscar CEP", "red");
        });
};

/**== Telefone ==*/
telefone.addEventListener("input", () => {

    let valor = telefone.value.replace(/\D/g, "");

    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    telefone.value = valor;

});

/**== E-mail ==*/

function validarEmail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


email.addEventListener("input", () => {
    const msg = document.getElementById("mensagemCadastro");

    if (validarEmail(email.value)) {
        msg.textContent = "E-mail válido.";
        email.classList.add("input-ok");
    }

    else {
        msg.textContent = "E-mail inválido.";
        email.classList.remove("input-ok");
        email.classList.add("input-erro");
    }
});

/**== Senha ==*/

function tamanhosenha() {

    return senha.value.length >= 8;
}

/**== localStorage ==*/

function cadastrarUsuario() {

    const campos = [
    nome,
    cpf,
    cep,
    telefone,
    email,
    senha,
    confirmarSenha
];

const existeCampoVazio = campos.some(
    campo => campo.value.trim() === ""
);

if (existeCampoVazio) {
    mostrarMensagem(
        "Preencha todos os campos.",
        "red"
    );
    return;
}

    if (!validarCPF(cpf.value)) {
        mostrarMensagem("CPF inválido", "red");
        return;
    }

    if (!tamanhosenha()) {
        mostrarMensagem ("A senha deve ter pelo menos 8 caracteres", "red");
        return;
    }

    if (confirmarSenha.value !== senha.value) {
            mostrarMensagem("As senhas não coincidem", "red");
        return;
    }

    let usuario =
        JSON.parse(localStorage.getItem("usuario")) || [];

    // CPF duplicado
    const cpfExiste = usuario.some(u => u.cpf === cpf.value);
    if (cpfExiste) {
        mostrarMensagem("CPF já cadastrado", "red");
        return;
    }

    // EMAIL duplicado
    const emailExiste = usuario.some(u => u.email === email.value);
    if (emailExiste) {
        mostrarMensagem("E-mail já cadastrado", "red");
        return;
    }

    const novoUsuario = {
        nome: nome.value,
        cpf: cpf.value,
        cep: cep.value,
        rua: rua.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        telefone: telefone.value,
        email: email.value,
        senha: senha.value
    };

    usuario.push(novoUsuario);

    localStorage.setItem("usuario", JSON.stringify(usuario));

    mostrarMensagem("Cadastro realizado com sucesso!");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);
}
