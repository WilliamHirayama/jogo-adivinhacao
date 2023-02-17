var chute = document.querySelector("input")
var botaoComeçar = document.querySelector(".iniciar");
var botaoCompare = document.querySelector(".compare");
var botaoNovoSegredo = document.querySelector(".novo-segredo");
var botaoReiniciar = document.querySelector(".reiniciar");

chute.style.display = "none"
botaoCompare.style.display = "none";
botaoNovoSegredo.style.display = "none";
botaoReiniciar.style.display = "none";

chute.focus(); //deixa o campo em destaque, altera a borda

var maximoNumeros = 0; //nº máximo do intervalo de jogo
var maximoSegredos = 0; //nº máximo de segredos por rodada
var segredos = []; //armazena apenas os segredos da rodada
var segredosGerados = []; //armazena todos os segredos gerados
var acertos = []; //armazena os acertos

/***********************************

PARTE 1: GERAÇÃO DO NÚMERO ALEATÓRIO

************************************/

function iniciarJogo () {
  
  maximoNumeros = parseInt(prompt("O jogo gerará números de 1 a"));
  maximoSegredos = parseInt(prompt("Com quantos números secretos você quer jogar por rodada? Lembrando que nas rodadas seguintes, caso a quantidade de segredos disponíveis seja menor que a jogada na primeira rodada, serão gerados segredos na quantidade restante."));
  segredos = sorteiaSegredos(maximoSegredos);
  console.log(segredos);
  botaoComeçar.style.display = "none";
  chute.style.display = "inline"
  botaoCompare.style.display = "inline";
}

botaoComeçar.onclick = iniciarJogo;

//Sorteia um número aleatório de 0 a 10
function sorteiaNumero () {
  return Math.round(Math.random()*maximoNumeros);
}

//Sorteia os segredos com base na quantidade de números desejados
function sorteiaSegredos (quantidadeNumeros) { 		
  var contador = 1;

  while (contador <= quantidadeNumeros) { //cria um loop para gerar os números na exata quantidade desejada
    
    var numeroAleatorio = sorteiaNumero();
    var numeroRepetido = false;

      if (numeroAleatorio !== 0) { //condição para que o número gerado seja sempre diferente de 0
        
        for (var posicao = 0; posicao < segredosGerados.length; posicao++) { //percorre a array dos números gerados para verificar se o número gerado já existe.
					
          if (segredosGerados[posicao] == numeroAleatorio) { //se o número já existir, o loop é encerrado.
            numeroRepetido = true; //ao alterar o valor de "numeroRepetido", a condicional do if subsequente não é executado, pois a expressão resulta em false
            break;
          }
        }
				
        if (numeroRepetido == false) {
          segredos.push(numeroAleatorio);
          segredosGerados.push(numeroAleatorio);
          contador++
        }       
      }
  }	
  return segredosGerados
  console.log(segredos);
}

/*************************************************

PARTE 2: VERIFICA SE O CHUTE ESTÁ CERTO OU ERRADO

*************************************************/

function verificaChute() {
  var achou = false;

  for(var posicao = 0; posicao < segredos.length; posicao++) {
    if(chute.value == segredos[posicao]) {

      alert("Você ACERTOU!");
      achou = true;
      
      for (var posicao = 0; posicao <= acertos.length; posicao++) {
        if (acertos[posicao] == chute.value) {
          break;
        }
      }
      if (acertos[posicao] != chute.value) {
          acertos.push(parseInt(chute.value));
        }
      console.log(acertos);
      break;
     } 
  }

    if(achou == false) {
      alert("Você ERROU!");
    }

    chute.value = "";
    chute.focus();

  if (comparaSegredosAcertos()) {
    alert("Parabéns, você descobriu os segredos!")
    if (segredosGerados.length == maximoNumeros) {
      botaoNovoSegredo.style.display = "none";
      botaoCompare.style.display = "none";
      chute.style.display = "none"
      botaoReiniciar.style.display = "inline";
      alert("Você descobriu TODOS os segredos!");
      alert("GAME OVER");
    } else {
      botaoNovoSegredo.style.display = "inline";
    }
  }
}

botaoCompare.onclick = verificaChute;


/*******************************

PARTE 3: ADICIONA NOVOS SEGREDOS

********************************/

//Função que define a ordenação para o método .sort da função comparaSegredosAcertos
function compararNumeros(a, b) {
  return a - b;
}

//Função que compara os elementos dos arrays segredosGerados e acertos.
function comparaSegredosAcertos () {
    if (segredosGerados.length != acertos.length) {
        return false;
    }

    segredosGerados.sort(compararNumeros);
    return acertos.sort(compararNumeros).every(function (element, index) {
        return element === segredosGerados[index]
    });
}

function gerarNovoSegredo () {  
  if ((segredosGerados.length + maximoSegredos) < maximoNumeros) {
    segredos = [];
    sorteiaSegredos(maximoSegredos);
  } else {
    segredos = [];
    sorteiaSegredos((maximoNumeros - segredosGerados.length));
  }
 
  console.log(segredos)

  botaoNovoSegredo.style.display = "none";
}

botaoNovoSegredo.onclick = gerarNovoSegredo;

/*************************************************

PARTE 4: REINICIA O JOGO

*************************************************/

function reiniciar () {
  acertos = [];
  segredos = [];
  segredosGerados = [];
  maximoNumeros = parseInt(prompt("O jogo gerará números de 1 a"));
  maximoSegredos= parseInt(prompt("Com quantos números secretos você quer jogar por rodada? Lembrando que nas rodadas seguintes, caso a quantidade de segredos disponíveis seja menor que a jogada na primeira rodada, serão gerados segredos na quantidade restante."));
  sorteiaSegredos(maximoSegredos);
  botaoCompare.style.display = "inline";
  chute.style.display = "inline"
  botaoReiniciar.style.display = "none";
}

botaoReiniciar.onclick = reiniciar;
