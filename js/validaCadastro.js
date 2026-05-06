/*== Elementos do formulário de cadastro ==*/
const nome = document.getElementById("name").value;
const mothername = document.getElementById("mothername").value;
const celular = document.getElementById("celular").value
const cpf = document.getElementById("cpf").value;
const cep = document.getElementById("cep").value;
const email = document.getElementById("email").value;
const senha = document.getElementById("password").value;
const confirmarSenha = document.getElementById("confirmpassword")

/**== Funções de validação ==*/

/**== CPF ==*/
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');

    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <+9; i++)
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i-1, i) * (12 - i));

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
}

/**== CEP (utilizando o API ViaCEP) ==*/
document.getElementById("cep").addEventListener("blur", function() {
    const cep = this.value.replace(/\D/g, '');
    const cepErro = document.getElementById("cepErro")


    cepErro.textContent = "";

    if (cep.length !== 8) {
     cepErro.textContent = "CEP inválido."   
     return; 
    }

    fetch('https://viacep.com.br/ws/${cep}/json')
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                erro.textContent = "CEP não encontrado.";
                return;
            }
            
            document.getElementById("rua").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
        })
        
        .catch(() => {
            erro.textContent = "Erro ao buscar CEP";
        });
})

/**== E-mail ==*/

function validarEmail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


email.addEventListener("input", () => {
    const msg = document.getElementById("emailmsg");

    if (validarEmail(email.value)) {
        msg.textContent = "E-mail válido.";
        msg.className = "success";
        email.classList.add("input-ok");
    }

    else {
        msg.textContent = "E-mail inválido.";
        msg.className = "erro";
        email.classList.add("input-erro");
    }
});
/**== Senha ==*/

function validarSenha(senha) {


    return senha.length >= 8;
}

senha.addEventListener("input",() =>{
    const msg = document.getElementById("passwordmsg")

    if(senha.value.length >= 8) {
        msg.textContent = "Senha válida."
        msg.className = "ok"
        msg.classList.add("input-ok")
    }

    else {
        msg.textContent = "A senha deve ter no mínimo 6 caracteres."
        msg.className = "erro"
        msg.classList.add("input-erro")
    }
})

/**== Telefone ==*/
function validarTelefone(celular) {

    const regex = /^\+55\s?\(?([1-9][0-9])\)?\s?(9\d{4}|\d{4})-?\d{4}$/;
    return regex.test(celular);
}
 /**== A função que vai mandar mensagens de erro se a condição de qualquer função de verificação não for verdadeira ==*/   
function validar() {
    
    const nomemsg = document.getElementById("nomemsg")
    const mothernamemsg = document.getElementById("mothernamemsg");
    const emailmsg = document.getElementById("emailmsg");
    const celularmsg = document.getElementById("cellmsg");
    const senhamsg = document.getElementById("passwordmsg");
    const confirmarSenhamsg = document.getElementById("confirmpasswordmsg");
    const cpfmsg = document.getElementById("cpfmsg");
    const buttonmsg = document.getElementById("buttonmsg");

    nomemsg.textContent = "";
    mothernamemsg.textContent = "";
    emailmsg.textContent = "";
    celularmsg.textContent = "";
    senhamsg.textContent = "";
    confirmarSenhamsg.textContent = "";
    celularmsg.textContent = "";
    cpfmsg.textContent = "";
    buttonmsg.textContent = "";

    let valido = true;

    if (nome === "") {
        nomemsg.textContent = "Insira seu nome.";
        nomemsg.className = "erro";
        nomemsg.classList.add("input-erro");
    }

    else {
        nomemsg.className = "success";
        nomemsg.classList.add("input-success");
        nomemsg.classList.remove("input-erro");
    }

    if (mothername === "") {
        mothernamemsg.textContent = "Insira o nome materno.";
        mothernamemsg.className = "erro";
        mothernamemsg.classList.add(input-erro);
    }

    else {
        mothernamemsg.className = "success";
        mothernamemsg.classList.add("input-success");
        mothernamemsg.classList.remove("input-erro");
    }

    if (confirmarSenha !== senha) {
        confirmarSenhamsg.textContent = "As senhas não coincidem";
        confirmarSenhamsg.className = "erro";
        confirmarSenhamsg.classList.add("input-erro");
        valido = false;
    }

    else {
        confirmarSenhamsg.className = "success";
        confirmarSenhamsg.classList.add("input-success");
        confirmarSenhamsg.classList.remove("input-erro");
    }

    if (!validarTelefone(celular)) {
        celularmsg.textContent = "Número de telefone inválido! Use o DDD + número.";
        valido = false;
    }

    if (!validarCPF(cpf)) {
        cpfmsg.textContent = "CEP inválido (use 8 números)";
        cpfmsg.className = "erro"
        cpfmsg.classList.add("input-erro")
        valido = false;
    }

    else {
        cpf
    }

    if (valido) {
        mensagem.textContent = "Cadastro realizado com sucesso!"
        mensagem.className = "success";
    }

}