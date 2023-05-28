/*======================== Máscara ========================*/

const masks = {
    rg(value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{1})\d+?$/, `$1`)
    },

    cpf(value) {
        return value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, `$1.$2`) 
        .replace(/(\d{3})(\d)/, `$1.$2`) 
        .replace(/(\d{3})(\d{1,2})/, `$1-$2`)
        .replace(/(-\d{2})\d+?$/, `$1`)
    },

    tel(value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, `($1) $2`)
        .replace(/(\d{4})(\d)/, `$1-$2`)
        .replace(/(\d{4})-(\d)(\d{4})/, `$1$2-$3`)
        .replace(/(-\d{4})\d+?$/, `$1`)
    }
}

document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {
        e.target.value = masks[field](e.target.value)
    }, false)
})

/*======================= Validação =======================*/

const button = document.getElementById('button')

button.addEventListener('click', (event) => {
    event.preventDefault()

    const name = document.getElementById('name')
    const rg = document.getElementById('rg')
    const cpf = document.getElementById('cpf')
    const email = document.getElementById('email')
    const phone = document.getElementById('phone')

    //Validação do Nome
    if(name.value == '') {
        name.classList.add('error-alert')
    } else {
        name.classList.remove('error-alert')
    }
    
    //Validação do RG
    if(rg.value == '' || rg.value.length != 12) {
        rg.classList.add('error-alert')
    } else {
        rg.classList.remove('error-alert')
    }

    // Validação do CPF
    if(cpf.value == '' || cpf.value.length != 14) {
        cpf.classList.add('error-alert')
    } else {
        cpf.classList.remove('error-alert')
    }

    cpf.classList.add('error-alert')
    function TestaCPF(strCPF) {
        var oldstrCPF = cpf.value;
        var strCPF = oldstrCPF.replace(/\D/g, '');
        var Soma;
        var Resto;
        Soma = 0;
      if (strCPF == '') return false;
      if (strCPF == '00000000000') return false;
    
      for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    if(TestaCPF()) {
        cpf.classList.remove('error-alert')
    }

    //Validação do Email
    if(email.value == '') {
        email.classList.add('error-alert')
    } else {
        email.classList.remove('error-alert')
    }

    if(email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1 || email.value.indexOf('.') - email.value.indexOf('@') == 1) {
        email.classList.add('error-alert')
    } else {
        email.classList.remove('error-alert')
    }

    //Validação do Telefone
    if(phone.value == '' || phone.value.length < 14) {
        phone.classList.add('error-alert')
    } else {
        phone.classList.remove('error-alert')
    }
})