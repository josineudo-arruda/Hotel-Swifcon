
var HOSPEDES = [
    {
        usuario: 'josineudo-arruda',
        senha: 2678
    },
    {
        usuario: '1234',
        senha: 1234
    }
] // Formato de Banco de Dados 'json'

var HOTEL = [];

// Criando 20 quartos
for (let i = 1; i <= 20; i++) {
    HOTEL.push({
        quarto: i,
        esta_reservado: false,
        reservado_por: ''
    });
}

usuario_atual = {
    usuario: '',
    senha: 0
} // Salvar globalmente cookie de acesso

function inicio(novo_user) {
    if(novo_user) { 
        alert("Bem vindo ao Hotel Swiftcon");
        entrar_usuario();
        alert("Bem vindo ao Hotel Swiftcon, " + usuario_atual.usuario + ". É um imenso prazer ter você por aqui!");
    }
    
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
        erro(3);
    }
}

function entrar_usuario() {
    usuario = prompt("Insira seu usuário:");
    if(!(HOSPEDES.some(hospede => hospede.usuario == usuario))) {
        erro(1);
        inicio(true); 
    }

    senha = parseInt(prompt("Insira a sua senha"));
    if(!(HOSPEDES.some(hospede => hospede.senha == senha))) {
        erro(2);
        inicio(true); 
    }

    usuario_atual.name = usuario;
    usuario_atual.senha = senha;
}

function reserva_quartos() {
    alert('HOTEL SWIFTCON - RESERVA DE QUARTOS');
    inicio();
}

function cadastro_hospedes() {
    alert('HOTEL SWIFTCON - CADASTRO DE HÓSPEDES');
    inicio();
}

function abastecer_carros() {
    alert('HOTEL SWIFTCON - ABASTECER');
    inicio();
}

function erro(numero) {
    switch(numero) {
        case 1:
            alert('ERRO: Usuário inserido inválido.');
            break;
        case 2:
            alert('ERRO: Senha inserida inválida.');
            break;
        case 3:
            alert("ERRO: Insira um valor válido para as opções.");
            break;
        default:
            alert("ERRO: Inválido");
            break;
    }
    inicio();
}

function sair() {
    var confirma = confirm('Você deseja sair?');
    if (confirma) {
        alert("Muito obrigado e até logo, " + usuario_atual.usuario + ".")
        window.close();
    } else {
        inicio();
    }
}

inicio(true);