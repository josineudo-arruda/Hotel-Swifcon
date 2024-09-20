
function inicio(novo_user) {
    if(novo_user) { alert("Bem vindo ao Hotel Terabithia"); }
    
    var escolha = parseInt(prompt('Selecione uma opção 1.) Reserva de Quartos 2.) Cadastro de Hóspedes 3.) Abastecimento de Carros 4.) Sair'));

    if (escolha === 1) {
        reserva_quartos();
    } else if (escolha === 2) {
        cadastro_hospedes();
    } else if (escolha === 3) {
        abastecer_carros();
    } else if (escolha === 4) {
        sair();
    } else {
        erro();
    }
}		

function reserva_quartos() {
    alert('HOTEL {NOME DO HOTEL} - RESERVA DE QUARTOS');
    inicio();
}

function cadastro_hospedes() {
    alert('HOTEL {NOME DO HOTEL} - CADASTRO DE HÓSPEDES');
    inicio();
}

function abastecer_carros() {
    alert('HOTEL {NOME DO HOTEL} - ABASTECER');
    inicio();
}

function erro() {
    alert('Por favor, informe um número entre 1 e 4');
    inicio();
}

function sair() {
    var confirma = confirm('Você deseja sair?');
    if (confirma) {
        window.close();
    } else {
        inicio();
    }
}

inicio(true);