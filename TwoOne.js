var TwoOne = {}; // Variavel principal do jogo

// Armazenando variaveis
TwoOne.primaria = document.getElementById('primaria'); // Local onde mostra as cartas do usuário
TwoOne.secundaria = document.getElementById('secundaria'); // Local onde mostra as cartas do oponente
TwoOne.pedir = document.getElementById('pedir'); // Botão para pedir mais uma carta
TwoOne.passar = document.getElementById('passar'); // Botão para dar a vez ao oponente
TwoOne.jogarButton = document.getElementById('jogar'); // Botão para começar o jogo
TwoOne.caixaDeTexto = document.getElementById('caixaDeTexto'); // Local onde mostra informações sobre o jogo
TwoOne.caixaMain = document.getElementById('caixaMain'); //
TwoOne.caixaJogtext = document.getElementById('caixaJog'); // Local onde mostra avanços do usuário
TwoOne.caixaOptext = document.getElementById('caixaOp'); // Local onde mostra avanços do oponente
TwoOne.contador = document.getElementById('contador'); // Local onde mostra V/E/D
TwoOne.novoJogo = document.getElementById('novoJogo'); // Local onde reinicia o jogo

// inicializa variáveis ​​para rastrear mãos, cartas, etc
TwoOne.maoUsuario = [];
TwoOne.maoOponente = [];
TwoOne.baralho = [];
TwoOne.naipe = ['paus <span>♣️</span>', 'ouro <span class="redcard">♦️</span>', 'copas <span class="redcard">♥️</span>', 'espadas <span>♠️</span>']; // Implementando nipe as cartas
TwoOne.valor = ["Ás", "Dois", "Três", "Quatros", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Valete", "Rainha", "Rei"]; // Implementando nome as cartas
TwoOne.vitoria = 0; // sinaliza quantas partidas o jogador já ganhou
TwoOne.derrota = 0; // sinaliza quantas partidas o jogador já perdeu
TwoOne.jogoStatus = 0; // sinaliza que o jogo ainda não foi ganho

// Função que faz a construção da carta com: Nome, Nipe e Valor.
function card(suit, value, name) {
    this.suit = suit;
    // String de nipe
    this.value = value;
    // Valor das cartas (1 - 10)
    this.name = name;
    // String do nome completo do cartão
};

//Função Novo jogo
function novoJogo() {

    // Remove o botão "Novo Jogo" e mostra os botões Pedir / Passar
    TwoOne.novoJogo.classList.add("hidden");

    // Redefine o texto e as variáveis ​​para "Novo Jogo"
    TwoOne.secundaria.innerHTML = "";
    TwoOne.secundaria.innerHTML = "";
    TwoOne.maoUsuario = [];
    TwoOne.maoOponente = [];
    TwoOne.jogoStatus = 0;

    // Cria o novo baralho
    TwoOne.baralho = criandoBaralho();

    // Distribua duas cartas para o jogador e duas para o oponente
    TwoOne.maoUsuario.push(TwoOne.baralho.pop());
    TwoOne.maoUsuario.push(TwoOne.baralho.pop());

    TwoOne.maoOponente.push(TwoOne.baralho.pop());
    TwoOne.maoOponente.push(TwoOne.baralho.pop());

    // Empate as mãos se nenhuma venceu na negociação inicial
    drawHands();
    TwoOne.caixaMain.classList.remove("hidden");
};

// Função que constrói as cartas
function criandoBaralho() {
    var baralho = [];

    // Percorre naipes e valores e entrega
    for (var a = 0; a < TwoOne.naipe.length; a++) {
        for (var b = 0; b < TwoOne.valor.length; b++) {
            var valorCarta = b + 1;
            var tituloCarta = "";
            if (valorCarta > 10) { valorCarta = 10; }
            if (valorCarta != 1) { tituloCarta += (TwoOne.valor[b] + " de " + TwoOne.naipe[a] + " (" + valorCarta + ")"); };
            var novaCarta = new card(TwoOne.naipe[a], valorCarta, tituloCarta);
            baralho.push(novaCarta); // Adicionando um elemento na array

        }
    }
    baralho = embaralhar(baralho); // embaralhar embaralha as cartas
    return baralho;
};

// Atualize a tela com o conteúdo das mãos do jogador e do oponente
function drawHands() {
    var variavel = "";
    var totalJog = recebeTotal(TwoOne.maoUsuario);
    var totalOp = recebeTotal(TwoOne.maoOponente);
    variavel += "<ul>";
    for (var i = 0; i < TwoOne.maoUsuario.length; i++) { variavel += "<li>" + TwoOne.maoUsuario[i].name + "</li>"; }
    variavel += "</ul>";
    TwoOne.primaria.innerHTML = variavel;
    TwoOne.caixaJogtext.innerHTML = "Sua mão: (" + totalJog + ")";
    // Atualiza o total da mão do jogador
    if (TwoOne.maoOponente.length == 0) { return; }

    // Limpe a string html, refaça para o revendedor, dependendo se Passar foi pressionado ou não
    variavel = "";
    if (TwoOne.jogoStatus == 0) {
        TwoOne.caixaOptext.innerHTML = "Mão do oponente: (" + TwoOne.maoOponente[1].value + ")";
    } else {
        TwoOne.caixaOptext.innerHTML = "Mão do oponente: (" + totalOp + ")";
        // atualiza o total da mão do oponente
    }
    for (var i = 0; i < TwoOne.maoOponente.length; i++) {

        if (TwoOne.jogoStatus == 0) { i += 1; }
        variavel += "<li>" + TwoOne.maoOponente[i].name + "</li>";
    }
    variavel += "</ul>"
    TwoOne.secundaria.innerHTML = variavel;
};
// Retorna o valor total da mão
function recebeTotal(hand) {
    var total = 0;
    var aceFlag = 0;
    for (var i = 0; i < hand.length; i++) {
        total += hand[i].value;
        if (hand[i].value == 1) {
            aceFlag += 1;
        }
    }
    for (var j = 0; j < aceFlag; j++) {
        if (total + 10 <= 21) {
            total += 10;
        }
    }
    return total;
}


// Embaralhe o novo baralho
function embaralhar(baralho) {
    var embaralhardbaralho = [];
    var baralhoL = baralho.length;
    for (var a = 0; a < baralhoL; a++) {
        var randomCard = getRandomInt(0, (baralho.length));
        embaralhardbaralho.push(baralho[randomCard]);
        baralho.splice(randomCard, 1);
    }
    return embaralhardbaralho;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;

}

function baralhoPrinter(baralho) {
    for (var i = 0; i < baralho.length; i++) {
        console.log(baralho[i].name);
    }
    return
}

// O loop do jogo começa quando o botão Novo Jogo é pressionado
TwoOne.jogarButton.addEventListener("click", novoJogo);

// Botão de pedir pressionado:
TwoOne.pedir.addEventListener("click", function() {

    // Jogo para se já foi ganho
    if (TwoOne.jogoStatus == 2) { return; }

    // Distribui uma carta ao usuario
    TwoOne.maoUsuario.push(TwoOne.baralho.pop());
    drawHands();

    var handVal = recebeTotal(TwoOne.maoUsuario);
    if (handVal > 21) {
        derrota();
        return;
    } else if (handVal == 21) {
        vitoria();
        return;
    }
    TwoOne.caixaDeTexto.innerHTML = "Pedir ou Passar?</p>";
    return;
});

// Mantenha o botão pressionado:
TwoOne.passar.addEventListener("click", function passarLoop() {
    // Desabilita o jogo ig já ganho
    if (TwoOne.jogoStatus == 2) {
        return;
    } else if (TwoOne.jogoStatus == 0) // Passar foi apenas pressionado
    {

        TwoOne.caixaMain.classList.add("hidden");
        // Tira os botões Pedir e Passar
        var handVal = recebeTotal(TwoOne.maoOponente);
        TwoOne.jogoStatus = 1;
        // Entrar no loop 'Passar'
        // Conselho claro
        TwoOne.caixaDeTexto.innerHTML = "...";
        drawHands();
        setTimeout(passarLoop, 750);
        // Retornar ao loop de permanência
    } else if (TwoOne.jogoStatus == 1) {

        // Se o oponente tiver menos de 17, ele pede
        var handVal = recebeTotal(TwoOne.maoOponente);
        if (handVal > 16 && handVal <= 21)
        // Oponente fica e o jogo resolve
        {
            drawHands();
            var jogarerVal = recebeTotal(TwoOne.maoUsuario);
            if (jogarerVal > handVal) {
                vitoria();
                return;
            } else if (jogarerVal < handVal) {
                derrota();
                return;
            } else {
                empate();
                return;
            }
        }
        if (handVal > 21) {
            vitoria();
            return;
        } else // Pedir
        {
            TwoOne.caixaDeTexto.innerHTML = "Acerto do oponente!";
            TwoOne.maoOponente.push(TwoOne.baralho.pop());
            drawHands();
            setTimeout(passarLoop, 750);
            return;
        }
    }
});

function vitoria() {
    TwoOne.vitoria += 1;
    var explanation = "";
    TwoOne.jogoStatus = 2;
    // Sinaliza que o jogo acabou
    var minhaMao = recebeTotal(TwoOne.maoUsuario);
    var dealerTotal = recebeTotal(TwoOne.maoOponente);
    if (minhaMao == 21) {
        explanation = "Sua mão tem o valor: 21!";
    } else if (dealerTotal > 21)

    {
        explanation = "Oponente atingiu " + dealerTotal + "!";
    } else {
        explanation = "Sua mão " + minhaMao + " Mão do oponente " + dealerTotal + ".";
    }
    TwoOne.caixaDeTexto.innerHTML = "Você ganhou! 😀😀😀😀 <br>" + explanation + "<br>pressione 'Novo Jogo' para jogar novamente.";
    track();
}
var empate = function() {
    if (minhaMao == dealerTotal) {
    TwoOne.textUpdates.innerHTML = "Empate! 🤔 <br>Pressione 'Novo Jogo' para jogar novamente.";
    return;
    }
    // Sinaliza que o jogo acabou
}

function derrota() {
    TwoOne.derrota += 1;
    var explanation = "";
    TwoOne.jogoStatus = 2;
    // Sinaliza que o jogo acabou
    var minhaMao = recebeTotal(TwoOne.maoUsuario);
    if (minhaMao > 21) { explanation = "Valor final deu: " + minhaMao; }
    TwoOne.caixaDeTexto.innerHTML = "Você perdeu. 😒 <br>" + explanation + "<br>Pressione 'Novo Jogo' para jogar novamente.";
    track();
}

// Atualiza o contador de V/D
function track() {
    TwoOne.contador.innerHTML = "Vitorias 😀 :" + TwoOne.vitoria + "<br>Derrotas 😒 :" + TwoOne.derrota;
    TwoOne.novoJogo.classList.remove("hidden");
    TwoOne.caixaMain.classList.add("hidden");
}

// MENU PRINCIPAL

// Entrada do Modal

function intrucoes() {
    let modal = document.querySelector('.modalIntrucoes')
    modal.style.display = 'block';
}

function tema() {
    let modal = document.querySelector('.modalTema')
    modal.style.display = 'block';
}

//Saida do Modal

function fecharInstrucoes() {
    let modal = document.querySelector('.modalIntrucoes')
    modal.style.display = 'none';
}

function fechar() {
    let modal = document.querySelector('.modalTema')
    modal.style.display = 'none';
}