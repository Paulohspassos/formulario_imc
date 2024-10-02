const doc = document.querySelector("#form");

// Como comentei antes, ser mais descritivo nas variáveis, abreviar é complicado pois para outra pessoa dar manutenção é pior
function calcularIdade(dataDeNascimento) {
  //para não criar novas variáveis lá em baixo, vc pode desestruturar o array para pegar posições fixas dele, dessa forma já tenho ano,mes e dia sem precisar criar novas variáveis
  const [ano, mes, dia] = dataDeNascimento.split("-");
  // Não tem mta diferença pois o JS entende que vc tá chamando o construtor de Date, mas ele é uma função, é bom por os parênteses

  const data = new Date();
  (anoAtual = data.getFullYear()),
    //Esse +1 é o q chamaróamos de magic number. É um número que vc batendo o olho n entende o pq dele estar ali.
    //Eu entendo que é pq no getMonth janeiro é retornado como 0, mas vc pode nomear esse 1 para ser algo diferente
    //Exemplo:
    // const AJUSTE_MES = 1
    // mes_atual = d.getMonth() + AJUSTE_MES
    (mesAtual = data.getMonth() + 1),
    (diaAtual = data.getDay()),
    (idadeReal = anoAtual - ano);

  if (mesAtual < mes || (mesAtual == mes && diaAtual < dia)) {
    idadeReal--;
  }

  // Melhor do que usar um ternário que é mais difícil de ler vc pode usar essa função que sempre retorna o maior número entre os parâmetros
  return Math.max(0, idadeReal);
}

//Renomeei para ficar melhor de entender oq a função faz
function calcularImc(peso, altura) {
  // Vc n precisa criar essas variáveis, pode passar direto pra variável que calcula o IMC
  //   const pesoNum = Number(peso);
  //   const alturaNum = Number(altura.replace(",", "."));

  const IMC = Number(peso) / Number(altura.replace(",", ".")) ** 2;
  if (IMC < 16.9) {
    return "Muito abaixo do peso.";
  } else if (IMC >= 17 && IMC <= 18.4) {
    return "Abaixo do peso";
  } else if (IMC >= 18.5 && IMC <= 24.9) {
    return "Peso normal";
  } else if (IMC >= 25 && IMC <= 29.9) {
    return "Acima do peso";
  } else if (IMC >= 30 && IMC <= 34.9) {
    return "Obesidade grau 1";
  } else if (IMC >= 35 && IMC <= 40) {
    return "Obesidade grau 2";
  } else {
    return "Obesidade grau 3";
  }
}

//fiz essa função para explicar oq eu disse na linha 113
const validarResultado = (
  altura,
  peso,
  dataDeNascimento,
  nome,
  idade,
  IMC,
  data
) => {
  const resultado = document.querySelector("#resultado");
  //incializo o erro como nulo pois pode não haver erros
  let erro = null;
  //atribuo o erro ao que está faltando
  console.log(altura, peso, dataDeNascimento, nome, idade, IMC, data);
  if (!altura) erro = "altura";
  if (!peso) erro = "peso";
  if (!dataDeNascimento) erro = "dataDeNascimento";
  if (!nome) erro = "nome";

  // fiz isso só para manter a primeira letra do nome do campo maiúscula
  const nomeDoCampo = erro ? erro.charAt(0).toUpperCase() + erro.slice(1) : "";
  console.log("erro", erro);
  //checo para ver se alguma coisa está faltando e mudou o erro
  if (erro) {
    console.log("erro", erro);
    resultado.innerHTML =
      //Essas strings entre crase se chamam template literals, eu consigo colocar variáveis dentro de uma string usando ${nomeDaVariável}
      `<p>Por favor insira seu ${erro} no campo <strong>"${nomeDoCampo}."</strong></p>`;
    resultado.style.display = "block";
    resultado.style.background = "rgba(255, 0, 0, 0.603)";
    return false;
  } else {
    console.log("N erro", erro);
    resultado.innerHTML = `<h2>${nome}</h2>
    <p>Nascido em: ${data[2]}/${data[1]}/${data[0]}</p>
    <p>Peso atual: ${peso} Kg</p>
    <p>Medindo: ${altura}m</p>
    <p>Idade: ${idade} anos</p>
    <p>Situação: <strong>${IMC}</strong></p>`;
    resultado.style.display = "block";
    resultado.style.background = "#2b81328e";
    return true;
  }
};
doc.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.querySelector("#nome");
  const dataDeNascimento = document.querySelector("#dataDeNascimento");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const data = dataDeNascimento.value.split("-");

  // Não mesclar inglês e português, se atém a uma lingua só para facilitar o entendimento
  const idade = calcularIdade(dataDeNascimento.value);
  const IMC = calcularImc(peso.value, altura.value);

  //Vc pode fazer essa parte da validação de várias maneiras! Tem como ser mais sucinto do que por várias validações, vou te mostrar uma opção!
  //   if (!altura.value) {
  //     resultado.innerHTML =
  //       '<p>Por favor insira sua altura no campo <strong>"Altura."</strong></p>';
  //     resultado.style.display = "block";
  //     resultado.style.background = "rgba(255, 0, 0, 0.603)";
  //   }

  //   if (!peso.value) {
  //     resultado.innerHTML =
  //       '<p>Por favor insira seu peso no campo <strong>"Peso."</strong></p>';
  //     resultado.style.display = "block";
  //     resultado.style.background = "rgba(255, 0, 0, 0.603)";
  //   }

  //   if (!dataDeNascimento.value) {
  //     resultado.innerHTML =
  //       '<p>Por favor insira sua data de nascimento no campo <strong>"Data de nascimento."</strong></p>';
  //     resultado.style.display = "block";
  //     resultado.style.background = "rgba(255, 0, 0, 0.603)";
  //   }

  //   if (!nome.value) {
  //     resultado.innerHTML =
  //       '<p>Por favor insira seu nome no campo <strong>"Nome"</strong></p>';
  //     resultado.style.display = "block";
  //     resultado.style.background = "rgba(255, 0, 0, 0.603)";
  //   }

  //   if (nome.value && dataDeNascimento.value && peso.value && altura.value) {
  //     resultado.innerHTML = `<h2>${nome.value}</h2>
  //                         <p>Nascido em: ${data[2]}/${data[1]}/${data[0]}</p>
  //                         <p>Peso atual: ${peso.value} Kg</p>
  //                         <p>Medindo: ${altura.value}m</p>
  //                         <p>Idade: ${age} anos</p>
  //                         <p>Situação: <strong>${resImc}</strong></p>`;

  //     resultado.style.display = "block";
  //     resultado.style.background = "#2b81328e";

  const dadosValidos = validarResultado(
    altura.value,
    peso.value,
    dataDeNascimento.value,
    nome.value,
    idade,
    IMC,
    data
  );
  //Fiz isso para só resetar o formulário se os dados tiverem válidos, para evitar de a pessoa errar e ter q redigitar tudo
  if (dadosValidos) {
    nome.value = "";
    dataDeNascimento.value = "";
    peso.value = "";
    altura.value = "";
  }
});
