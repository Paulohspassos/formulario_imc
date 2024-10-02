const doc = document.querySelector('#idForm');

function idade(nasc) {
    const data = nasc.split('-')
    const d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDay(),

        idade_ano = data[0];
        idade_mes = data[1];
        idade_dia = data[2];

        idadereal = ano_atual - idade_ano;
    
        if(mes_atual < idade_mes || mes_atual == idade_mes && dia_atual < idade_dia) {
            idadereal--;
        }

        return idadereal < 0 ? 0 : idadereal;
}

function imc(peso, altura) {
    const pesoNum = Number(peso);
    const alturaNum = Number(altura.replace(',','.'));

    const imcReturn = pesoNum / (alturaNum ** 2);

    if(imcReturn < 16.9) {
        return 'Muito abaixo do peso.'
    } else if(imcReturn >=17 && imcReturn <= 18.4) {
        return 'Abaixo do peso'
    } else if(imcReturn >= 18.5 && imcReturn <= 24.9) {
        return 'Peso normal'
    } else if(imcReturn >= 25 && imcReturn <= 29.9) {
        return 'Acima do peso'
    } else if(imcReturn >= 30 && imcReturn <= 34.9) {
        return 'Obesidade grau 1'
    } else if(imcReturn >= 35 && imcReturn <= 40) {
        return 'Obesidade grau 2'
    } else {
        return 'Obesidade 3'
    }
}
doc.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.querySelector('#idNome');
    const dnasc = document.querySelector('#idNasc');
    const peso = document.querySelector('#idPeso');
    const altura = document.querySelector('#idAlt');
    const result = document.querySelector('#res');
    const arrayData = dnasc.value.split('-')

    const age = idade(dnasc.value);
    const resImc = imc(peso.value, altura.value);

    if(!altura.value) {
        result.innerHTML = '<p>Por favor insira sua altura no campo <strong>"Altura."</strong></p>'
        result.style.display = 'block'
        result.style.background = 'rgba(255, 0, 0, 0.603)'
    }

    if(!peso.value) {
        result.innerHTML = '<p>Por favor insira seu peso no campo <strong>"Peso."</strong></p>'
        result.style.display= 'block'
        result.style.background = 'rgba(255, 0, 0, 0.603)'
    }

    if(!dnasc.value) {
        result.innerHTML = '<p>Por favor insira sua data de nascimento no campo <strong>"Data de nascimento."</strong></p>'
        result.style.display= 'block'
        result.style.background = 'rgba(255, 0, 0, 0.603)'
    }

    if(!nome.value) {
        result.innerHTML = '<p>Por favor insira seu nome no campo <strong>"Nome"</strong></p>'
        result.style.display= 'block'
        result.style.background = 'rgba(255, 0, 0, 0.603)'
    }
    
    if(nome.value && dnasc.value && peso.value && altura.value){
        result.innerHTML = `<h2>${nome.value}</h2>
                        <p>Nascido em: ${arrayData[2]}/${arrayData[1]}/${arrayData[0]}</p>
                        <p>Peso atual: ${peso.value} Kg</p>
                        <p>Medindo: ${altura.value}m</p>
                        <p>Idade: ${age} anos</p>
                        <p>Situação: <strong>${resImc}</strong></p>`

        result.style.display = 'block'
        result.style.background = '#2b81328e'

        nome.value = '';
        dnasc.value = '';
        peso.value = '';
        altura.value = '';
    }
})