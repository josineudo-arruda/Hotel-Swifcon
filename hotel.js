
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
for (let i = 1; i <= 20; i++) { 
    HOTEL.push({
        quarto: i,
        esta_reservado: false,
        reservado_por: ''
    });
} // Criando 20 quartos

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
    alert('HOTEL SWIFTCON - LOGIN DE USUÁRIO');
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

    usuario_atual.usuario = usuario;
    usuario_atual.senha = senha;
}

function reserva_quartos() {
    alert('HOTEL SWIFTCON - RESERVA DE QUARTOS');

    var valor_diaria = parseFloat(prompt('Insira o valor da sua diária:'));
    if(valor_diaria <= 0.00) { erro(4); }

    var qtd_diaria = parseInt(prompt('Qual a quantidade de diárias:'));
    if(qtd_diaria <= 0 || qtd_diaria > 30) { erro(5); }

    var confirma = confirm('Você confirma o valor de ' + valor_diaria * qtd_diaria + '?');
    if (!confirma) { reserva_quartos(); }

    var nome_hospede = prompt('Insira o nome do hóspede:');
    if(nome_hospede == '') { erro(6); }

    reservar_quarto(nome_hospede);

    quartos_livres_hotel();

    inicio();
}

function quartos_livres_hotel() {
    var mensagem = 'Quartos do Hotel:\n'
    for (let i = 0; i < 20; i++) { 
        if(HOTEL[i].esta_reservado) {
            mensagem += 'Quarto '+HOTEL[i].quarto+': Reservado\n';
        } else {
            mensagem += 'Quarto '+HOTEL[i].quarto+': Livre\n';
        }
    }

    alert(mensagem);
}

function reservar_quarto(nome_hospede) {
    var num_quarto = parseInt(prompt('Qual o número do quarto? 1-20'));
    var quarto = HOTEL.find(reserva => reserva.quarto == num_quarto)
    if(quarto.esta_reservado) { 
        alert("Quarto "+num_quarto+" já está reservado. Escolha outro.");
        reservar_quarto(); 
    } else {
        quarto.esta_reservado = true;
        quarto.reservado_por = nome_hospede;
        alert("Quarto "+num_quarto+" foi reservado por "+quarto.reservado_por+".");
    }
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
        case 4:
            alert("ERRO: Insira um valor válido para diária (Maior que ZERO).");
            break;
        case 5:
            alert("ERRO: Insira um valor válido os dias (Maior que ZERO e menor que 30).");
            break;
        case 6:
            alert("ERRO: Insira um valor válido para nome (Diferente de NULL).");
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