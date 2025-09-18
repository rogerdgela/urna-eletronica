// Função que retorna um único elemento do DOM usando querySelector
const select = (el) => {
    return document.querySelector(el);
};

// Função que retorna múltiplos elementos do DOM usando querySelectorAll
const selectAll = (el) => {
    return document.querySelectorAll(el);
};

// Variáveis globais que armazenam referências a elementos do DOM

// Seleciona o elemento span dentro da classe d-1-1
// Este elemento provavelmente mostra o texto "SEU VOTO PARA"
let seuVotoPara = select('.d-1-1 span');

// Seleciona o elemento span dentro da classe d-1-2
// Este elemento mostra o cargo atual em votação (ex: vereador, prefeito)
let cargo = select('.d-1-2 span');

// Seleciona o elemento com a classe d-1-3
// Este elemento mostra as informações do candidato quando os números são digitados
let descricao = select('.d-1-4');

// Seleciona o elemento com a classe d-2
// Este elemento mostra mensagens de aviso ou instruções para o eleitor
let aviso = select('.d-2');

// Seleciona o elemento com a classe d-1-right
// Este elemento representa a área lateral direita da interface, onde aparece a foto do candidato
let lateral = select('.d-1-right'); 
