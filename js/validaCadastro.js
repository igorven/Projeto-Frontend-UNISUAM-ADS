function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');

    if(cpf.length !==11 || /^(\d)\1+$/.test(cpf)) return false;

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

function validarCEP(cep) {
    return /^[0-9]{8}$$/.test(cep);
}

function validar(){
    const cpf = document.getElementById("cpf").value;
    const cep = document.getElementById("cep").value;

    const cpfErro = document.getElementById("cpfErro");
    const cepErro = document.getElementById("cepErro");
    const mensagem = document.getElementById("mensagem");

    cpfErro.textContent = "";
    cepErro.textContent = "";
    mensagem.textContent = "";

    let valido = true;

    if(!validarCPF(cpf)) {
        cpfErro.textContent = "CEP inválido (use 8 números)";
        valido = false;
    }

    if (!validarCEP(cep)) {
        cepErro.textContent = "CEP inválido (use 8 números)"
        valido = false;
    }

    if (valido) {
        mensagem.textContent = "Cadastro realizado com sucesso!"
        mensagem.className = "sucesso";
    }

}