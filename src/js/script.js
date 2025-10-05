// Função que retorna um único elemento do DOM usando querySelector
const select = (el) => {
    // Retorna o primeiro elemento que corresponde ao seletor CSS passado
    return document.querySelector(el);
};

// Função que retorna múltiplos elementos do DOM usando querySelectorAll
const selectAll = (el) => {
    // Retorna todos os elementos que correspondem ao seletor CSS passado
    return document.querySelectorAll(el);
};

// Seleciona o elemento onde será exibido "Seu voto para"
let seuVotoPara = select('.d-1-1 span');
// Seleciona o elemento onde será exibido o cargo (ex: VEREADOR, PREFEITO)
let cargo = select('.d-1-2 span');
// Seleciona o elemento onde será exibida a descrição do candidato ou mensagem
let descricao = select('.d-1-4');
// Seleciona o elemento de aviso (mensagens de instrução ou alerta)
let aviso = select('.d-2');
// Seleciona a lateral direita onde aparecem as fotos dos candidatos
let lateral = select('.d-1-right');
// Seleciona o elemento onde aparecem os campos para digitação dos números
let numeros = select('.d-1-3');

// Variável que controla em qual etapa da votação estamos (índice do array etapas)
let etapaAtual = 0;
// Variável que armazena o número digitado pelo usuário
let numero = '';
// Variável que indica se o voto atual é branco
let votoBranco = false;
// Array que armazena todos os votos realizados
let votos = []

// Função que inicializa a etapa atual da votação
function comecarEtapa() {
    // Pega o objeto da etapa atual (VEREADOR ou PREFEITO)
    let etapa = etapas[etapaAtual];

    // String que irá armazenar o HTML dos campos de número
    let numerosHtml = '';
    // Limpa o número digitado
    numero = '';
    // Reseta o voto branco
    votoBranco = false;

    // Cria os campos de número conforme a quantidade necessária para a etapa
    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            // O primeiro campo já começa piscando
            numerosHtml += '<div class="numero pisca"></div>';
        } else {
            numerosHtml += '<div class="numero"></div>';
        }
    }

    // Exibe o texto "Seu voto para"
    seuVotoPara.innerHTML = 'Seu voto para';
    // Exibe o título do cargo (VEREADOR ou PREFEITO)
    cargo.innerHTML = etapa.titulo;
    // Limpa a descrição do candidato
    descricao.innerHTML = '';
    // Esconde o aviso
    aviso.style.display = 'none';
    // Limpa a lateral direita (fotos)
    lateral.innerHTML = '';
    // Insere os campos de número na tela
    numeros.innerHTML = numerosHtml;
}

// Função que atualiza a interface após digitação dos números
function atualizaInterface() {
    // Pega a etapa atual
    let etapa = etapas[etapaAtual];

    // Filtra o array de candidatos para encontrar o que tem o número digitado
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        }
        return false;
    });
    
    // Se encontrou candidato com o número digitado
    if (candidato.length > 0) {
        candidato = candidato[0];
        // Exibe o texto "Seu voto para"
        seuVotoPara.style.display = 'block';
        // Exibe o aviso
        aviso.style.display = 'block';
        // Mostra nome e partido do candidato
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        // Monta o HTML das fotos do candidato
        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                // Se a foto for pequena, aplica classe small
                fotosHtml += `<div class="d-1-image small"><img src="src/assets/images/${candidato.fotos[i].url}" alt="${candidato.nome}" />${candidato.fotos[i].legenda}</div>`;
            } else {    
                fotosHtml += `<div class="d-1-image"><img src="src/assets/images/${candidato.fotos[i].url}" alt="${candidato.nome}" />${candidato.fotos[i].legenda}</div>`;
            }
        }

        // Exibe as fotos na lateral direita
        lateral.innerHTML = fotosHtml;
    } else {
        // Se não encontrou candidato, mostra mensagem de voto em branco
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">Voto em branco</div>';
    }
}

// Função chamada ao clicar em um número do teclado
function clicou(n) {
    // Seleciona o campo de número que está piscando
    let elNumero = select('.numero.pisca');
    if (elNumero != null) {
        // Insere o número clicado no campo
        elNumero.innerHTML = n;
        // Adiciona o número digitado à variável 'numero'
        numero = `${numero}${n}`;

        // Remove a classe 'pisca' do campo atual
        elNumero.classList.remove('pisca');
        // Se existe um próximo campo, faz ele piscar
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            // Se não há mais campos, atualiza a interface (mostra candidato ou voto em branco)
            atualizaInterface();
        }
    }
}

// Função chamada ao clicar no botão BRANCO
function branco() { 
    // Só permite voto em branco se nenhum número foi digitado
    if (numero === '') {
        votoBranco = true;
        // Exibe o texto "Seu voto para"
        seuVotoPara.style.display = 'block';
        // Exibe o aviso
        aviso.style.display = 'block';
        // Limpa os campos de número
        numeros.innerHTML = '';
        // Mostra mensagem de voto em branco
        descricao.innerHTML = '<div class="aviso--grande pisca">Voto em branco</div>';
        // Limpa a lateral direita
        lateral.innerHTML = '';
    } else {
        // Se já digitou algum número, alerta o usuário
        alert('Você já digitou um número, para votar em branco, reinicie o voto(CORRIGE)');
    }
}

// Função chamada ao clicar no botão CORRIGE
function corrige() {
    // Reinicia a etapa atual
    comecarEtapa();
}

// Função chamada ao clicar no botão CONFIRMA
function confirma() { 
    // Pega a etapa atual
    let etapa = etapas[etapaAtual];

    // Variável que indica se o voto foi confirmado
    let votoConfirmado = false;

    // Se o voto for branco
    if (votoBranco) {
        votoConfirmado = true;
        // Adiciona o voto branco ao array de votos
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        });
    // Se o número digitado tem a quantidade correta de dígitos
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        // Adiciona o voto digitado ao array de votos
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    // Se o voto foi confirmado
    if (votoConfirmado) {
        // Avança para a próxima etapa
        etapaAtual++;
        // Se ainda existem etapas, inicia a próxima
        if (etapas.length !== etapaAtual) {
            comecarEtapa();
        } else {
            // Se não há mais etapas, exibe mensagem de fim e mostra os votos no console
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

// Inicia a primeira etapa da votação ao carregar o script
comecarEtapa();