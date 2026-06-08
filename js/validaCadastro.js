/*== Elementos do formulário de cadastro ==*/
const nome = document.getElementById("name");
const cpf = document.getElementById("cpf");
const cep = document.getElementById("cep");
const email = document.getElementById("email");
const senha = document.getElementById("password");
const confirmarSenha = document.getElementById("confirmpassword");

/**== Funções de validação ==*/

/**== CPF ==*/

cpf.addEventListener("blur", () => {

    const cpfmsg = document.getElementById("cpfmsg");

    if(validarCPF(cpf.value)) {
        cpfmsg.textContent = "CPF válido.";
        cpfmsg.className = "ok";
    }

    else {
        cpfmsg.textContent = ""
    }
})

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');

    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <=9; i++)
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);

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

    fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                cepErro.textContent = "CEP não encontrado.";
                return;
            }
            
            document.getElementById("rua").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
        })
        
        .catch(() => {
            cepErro.textContent = "Erro ao buscar CEP";
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


