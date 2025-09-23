// Função que retorna um único elemento do DOM usando querySelector
const select = (el) => {
    return document.querySelector(el);
};

// Função que retorna múltiplos elementos do DOM usando querySelectorAll
const selectAll = (el) => {
    return document.querySelectorAll(el);
};

let seuVotoPara = select('.d-1-1 span');
let cargo = select('.d-1-2 span');
let descricao = select('.d-1-4');
let aviso = select('.d-2');
let lateral = select('.d-1-right'); 
let numeros = select('.d-1-3');

let etapaAtual = 0;
let numero = 0;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numerosHtml = '';

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numerosHtml += '<div class="numero pisca"></div>';
        } else {
            numerosHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.innerHTML = 'Seu voto para';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numerosHtml;
}

function atualizaInterface() {
}

function clicou(n) {
    let elNumero = select('.numero.pisca');
    if (elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {}

function corrige() {}

function confirma() {}

comecarEtapa();