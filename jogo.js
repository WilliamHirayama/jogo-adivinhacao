//Sorteia um número aleatório de 0 a 10
function sorteiaNumero () {
  return Math.round(Math.random()*10);
}

//Sorteia os segredos com base na quantidade de números desejados
function sorteiaSegredos (quantidadeNumeros) {
    		
  var segredos = [];
  var contador = 1;

  while (contador <= quantidadeNumeros) { //cria um loop para gerar os números na exata quantidade desejada
    
    var numeroAleatorio = sorteiaNumero();
    var numeroRepetido = false;

      if (numeroAleatorio !== 0) { //condição para que o número gerado seja sempre diferente de 0
        
        for (var posição = 0; posição < segredos.length; posição++) { //percorre a array dos números gerados para verificar se o número gerado já existe.
					
          if (segredos[posição] == numeroAleatorio) { //se o número já existir, o loop é encerrado.
            numeroRepetido = true; //ao alterar o valor de "numeroRepetido", a condicional do if subsequente não é executado, pois a expressão resulta em false
            break;
          }
        }
				
        if (numeroRepetido == false) {
          segredos.push(numeroAleatorio);
          contador++
        }
      }
  }	
  return segredos
}
		
var segredos = sorteiaSegredos(3);

console.log(segredos);

//coleta o valor do input
var input = document.querySelector("input");
input.focus(); //deixa o campo em destaque, altera a borda

function verifica() {
  
  var achou = false;

  for(var posicao = 0; posicao < segredos.length; posicao++) {
   
    if(input.value == segredos[posicao]) {
    
      alert("Você ACERTOU!");
      achou = true;
      break;
     } 
  }

    if(achou == false) {

      alert("Você ERROU!");
    
    }

    input.value = "";
    input.focus();

}

var button = document.querySelector("button");

button.onclick = verifica;
