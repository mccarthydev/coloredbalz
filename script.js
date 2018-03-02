//Troca de Cor Título
function tituloCor(){
  var cores = ['#ff4d4d','#ffdb4d','#4d94ff','#4dff4d'];
  var coresmix = cores[Math.floor(Math.random() * cores.length)];

  document.getElementById('titulo').style.color = coresmix;
}
var trocaCores = setInterval(tituloCor, 1000);
//Troca de Cor Título

localStorage.setItem("highScore", highScore);

var score = 0; //score do jogo

//Inicio Jogo
function coloredBalls() {

  removeEventListener('onkeypress', coloredBalls); //desabilita o botao inicial para nao criar multiplos jogos ao mesmo tempo

  clearTimeout(trocaCores); //Para a funcao de trocar de cores do titulo

  document.getElementById('container').style.display = "none"; //Tira o menu principal da tela

  var coresConfirma = [];

  for (i=0; i<5; i++){

    circulo = document.createElement("div");

    var cores = ['#ff4d4d','#ffdb4d','#4d94ff','#4dff4d'];
    var coresmix = cores[Math.floor(Math.random() * cores.length)];
    circulo.style.backgroundColor = coresmix;

    cont = document.getElementById('containerJogo');
    cont.appendChild(circulo);

    //transformando hex em palavras para inserir no array
    if(coresmix==='#ff4d4d'){
      coresmix='red';
    }else if (coresmix==='#ffdb4d') {
      coresmix='yellow';
    }else if (coresmix==='#4d94ff') {
      coresmix='blue';
    }else if (coresmix==='#4dff4d') {
      coresmix='green';
    }
    //transformando hex em palavras para inserir no array

    //Array com as cores
    coresConfirma.push(coresmix);
    //console.log(coresConfirma);
    //Array com as cores
  }

  if(screen.width < 400){
     var circulos = document.querySelectorAll('#containerJogo div')

     for(i=0; i< circulos.length;i++){
       circulos[i].style.width = '45px';
       circulos[i].style.height = '45px';
     }
  }

  //Encerrar Jogo / Iniciar Validacao
  function encerrarJogo(){
    document.getElementById('containerJogo').style.display = "none";
  }
  setTimeout(function(){
    encerrarJogo()
    validarCores()
  },5000);
  //Encerrar Jogo / Iniciar Validacao

  function validarCores(){

    document.querySelector('#botoes').style.display = 'block';

    document.querySelector('#botaoProsseguir').style.display = 'none';
    document.querySelector('#botaoReiniciar').style.display = 'none';

    var containerConfirma = document.getElementById('containerJogoConfirma');
    var elementosConfima = document.querySelector('#circulosConfirma');

    for(i=0; i<5; i++){
      containerConfirma.style.display = "block";
      var nullBalz = document.createElement("div");
      nullBalz.value='gray';

      elementosConfima.appendChild(nullBalz);
    }

    if(screen.width < 400){
       var circulos = document.querySelectorAll('#circulosConfirma div')

       for(i=0; i< circulos.length;i++){
         circulos[i].style.width = '45px';
         circulos[i].style.height = '45px';
       }
    }

    function trocaCoresConfirma(){
      if(this.value === 'gray'){
        this.style.backgroundColor = '#ff4d4d';
        this.value = 'red'
      }else if (this.value === 'red') {
        this.style.backgroundColor = '#ffdb4d';
        this.value = 'yellow'
      }else if (this.value === 'yellow') {
        this.style.backgroundColor = '#4d94ff';
        this.value = 'blue'
      }else if (this.value === 'blue') {
        this.style.backgroundColor = '#4dff4d';
        this.value = 'green'
      }else if(this.value === 'green'){
        this.style.backgroundColor = '#ccc';
        this.value = 'gray'
      }
    }

    var circuloConfirma = document.querySelectorAll('#circulosConfirma div');
    //console.log(circuloConfirma);

    for (i=0; i < circuloConfirma.length; i++){
      circuloConfirma[i].addEventListener('click', trocaCoresConfirma);
    }

    document.getElementById('botaoValidar').addEventListener('click', verificarCor);

    function verificarCor(){

      document.getElementById('botaoValidar').removeEventListener('click', verificarCor);
      document.querySelector('#botaoReiniciar').style.display = 'block';
      document.querySelector('#botaoValidar').style.display = 'none';

      var coresInseridas = [];

      for (i=0; i < circuloConfirma.length; i++){
        var corInsert = circuloConfirma[i].value;
        coresInseridas.push(corInsert);
        //console.log(coresInseridas)
      }

      //console.log(coresInseridas)
      //console.log(coresConfirma);

      var textoAcerto = document.querySelector('#textoAcerto');
      if(JSON.stringify(coresInseridas) == JSON.stringify(coresConfirma)){

        textoAcerto.innerHTML = 'Acertou!';
        document.querySelector('#botaoProsseguir').style.display = 'block';

        score++
        document.querySelector('#score').innerHTML = "score: "+score;

      }else{
        textoAcerto.innerHTML = 'Errou!';
      }
    }
  }
}

//Fim Jogo

function reiniciar(){
  location.reload();
}

function prosseguir(){

  document.querySelector('#circulosConfirma').innerHTML = "";

  document.querySelector('#botaoValidar').style.display = 'block';
  document.querySelector('#botoes').style.display = 'none';

  document.querySelector('#containerJogo').innerHTML = "";
  document.getElementById('containerJogo').style.display = "block";

  document.querySelector('#textoAcerto').innerHTML = "";
  coloredBalls();
}
