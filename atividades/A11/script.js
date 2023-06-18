'use strict';

const cep = document.querySelector('#cep');
cep.addEventListener('blur', buscaCEP);

function apresentarDados(data) {
    for (const campo in data) {
        if (document.querySelector('#'+campo)) {
            document.querySelector('#'+campo).value = data[campo];
        }
    }
}

function buscaCEP(e) {
    let busca = cep.value.replace('-', '');

    const option = {
        method: 'get',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${busca}/json/`)
    .then((response) => {
        response.json()
        .then((data) => {apresentarDados(data);});
    }).catch((e) => {console.log('Erro: ', e,message);});
}