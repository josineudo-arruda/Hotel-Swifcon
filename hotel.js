
var HOSPEDES = [
    {
        usuario: 'josineudo-arruda',
        senha: 2678
    },
    {
        usuario: '1234',
        senha: 1234
    }
]

usuario_atual = {
    usuario: '',
    senha: 0
}

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
        erro();
    }
}

function entrar_usuario() {
    usuario = prompt("Insira seu usuário:");
    if(!(HOSPEDES.some(hospede => hospede.usuario == usuario))) {
        alert("ERRO: Usuário inserido inválido");
        inicio(true); 
    }

    senha = parseInt(prompt("Insira a sua senha"));
    if(!(HOSPEDES.some(hospede => hospede.senha == senha))) {
        alert("ERRO: Senha inserida inválida");
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

function erro() {
    alert('ERRO: Informe um número entre 1 e 4');
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