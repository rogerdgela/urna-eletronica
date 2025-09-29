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
let numero = '';
let votoBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numerosHtml = '';
    numero = '';
    votoBranco = false;

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
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        }

        return false;
    });
    
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            fotosHtml += `<div class="d-1-image"><img src="src/assets/images/${candidato.fotos[i].url}" alt="${candidato.nome}" />${candidato.fotos[i].legenda}</div>`;
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">Voto em branco</div>';
    }
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

function branco() { 
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">Voto em branco</div>';
        lateral.innerHTML = '';
    } else {
        alert('Você já digitou um número, para votar em branco, reinicie o voto(CORRIGE)');
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() { }

comecarEtapa();