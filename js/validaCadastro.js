document.addEventListener("DOMContentLoaded", function()) {

    function aplicarMascara(elemento, callback) {
        elemento.addEventListener('input', function(e) {
            e.target.value = callback(e.target.value);

            // == localStorage (salvar ao digitar) == //
            localStorage.setItem("form_" + e.target.id, e.target.value); 
            });
        }
    }

    aplicarMascara(document.getElementById('cpf'), function(v) {

        v= v.replace(/\D/g,'');
        v= v.replace(/(\d{3})(\d)/, '$1.$2');
        v= v.replace(/(\d{3})(\d)/, '$1.$2');
        v= v.replace(/(\d{3})(\d{1,2})$/, '$1.$2');
        return v;
    });

    aplicarMascara(document.getElementById('celular'), function(v) {

        v= v.replace(/\D/g, '');
        v= v.replace(/^(\d{2})(\d)/g, '($1)$2');
        v= v.replace(/(\d{5})(\d)/, '$1-$2');
        return v;
    })

    aplicarMascara(document.getElementById('cep'), function(v) {

        v= v.replace(/\D/g, '');

    })

    document.getElementById('cep').addEventListener('blur', function()) {

        let cep = this.value.replace(/\D/g, '');

        if(cep.length === 8) {
            fetch (https://viacep.com.br/ws/${cep}/json/)
                .then(res => res.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('bairro').value = data.bairro ||'';

                        document.getElementById('endereco').value = data.logradouro ||'';

                        // == localStorage (salvar auto-preenchidos) == //
                        localStorage.setItem("form_bairro", data.bairro ||'');

                        localStorage.setItem("form_endereco", data.logradouro ||'');
                        
                    }
                })
                .catch(() => {
                    console.error("Erro ao buscar CEP");
                });
        };
    };
};