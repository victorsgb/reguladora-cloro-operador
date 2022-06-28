// Características do produto ácido dicloroisocianúrico
const produto = {
    densidade: 0.74, // Medida em gramas por mililitro (g/mL)
    pureza: 0.6, // Percentual de cloro ativo no produto
};

// Características da bomba dosadora
const bomba = {
    vazaoMaxima: 0.1 // Medida em litros por minuto (L/min ou LPM)
}

// Inputs do usuário
const volumeProdutoInput = document.querySelector('#volume-produto');
let volumeProduto = volumeProdutoInput.value;

const volumeTamborInput = document.querySelector('#volume-tambor');
let volumeTambor = volumeTamborInput.value;

const vazaoPermeadoInput = document.querySelector('#vazao-permeado');
let vazaoPermeado = vazaoPermeadoInput.value;

// Elemento HTML para receber o output
const output = document.querySelector('#output')

// Função que calcula a regulagem de fluxo
function calculaRegulagemFluxo(volumeProduto, volumeTambor, vazaoPermeado) {

    // Cálculos intermediários
    const massaCloroAtivo = volumeProduto * produto.densidade * produto.pureza; // Medida em gramas de cloro ativo

    const concentracaoCloroAtivo = 1000 * massaCloroAtivo / volumeTambor; // Medida em mg/L

    const concentracaoCloroAtivoPortaria = 1 // Portaria estabelece medida entre 0,2 e 2 mg/L; usando 1 mg/L como alvo

    const vazaoDosadora = vazaoPermeado * (concentracaoCloroAtivoPortaria / concentracaoCloroAtivo);

    const regulagemFluxo = 100 * vazaoDosadora / bomba.vazaoMaxima;

    return regulagemFluxo.toPrecision(3) + "%";
}

// Ouçamos os inputs do usuário e retornemos o valor da regulagem de fluxo, sempre que houver uma atualização nos valores de entrada:

volumeProdutoInput.addEventListener('change', (e) => {

    volumeProduto = e.target.value; // Quantidade de produto usada, medida em mililitros (mL)

    output.textContent = calculaRegulagemFluxo(volumeProduto, volumeTambor, vazaoPermeado);

})

volumeTamborInput.addEventListener('change', (e) => {

    volumeTambor = e.target.value; // Capacidade do tambor de mistura, medida em litros (L)

    output.textContent = calculaRegulagemFluxo(volumeProduto, volumeTambor, vazaoPermeado);

})

vazaoPermeadoInput.addEventListener('change', (e) => {

    vazaoPermeado = e.target.value; // Vazão medida em litros por minuto (L/min ou LPM)

    output.textContent = calculaRegulagemFluxo(volumeProduto, volumeTambor, vazaoPermeado);

})

// Calculemos a regulagem assim que o site abre, com os valores padrão
output.textContent = calculaRegulagemFluxo(volumeProduto, volumeTambor, vazaoPermeado);