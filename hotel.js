// Definição do banco de dados de usuários
var SISTEMA = [
    { usuario: '2678', senha: 2678 },
    { usuario: '1234', senha: 1234 }
];

// Array para armazenar os hóspedes
var HOSPEDES = [];

// Criação de 20 quartos do hotel
var HOTEL = [];
for (let i = 1; i <= 20; i++) { 
    HOTEL.push({
        quarto: i,
        esta_reservado: false,
        reservado_por: ''
    });
}

// Objeto para armazenar o usuário atual
var usuario_atual = { usuario: '', senha: 0 };

// Função para iniciar o sistema
function inicio(novo_user) {
    if (novo_user) {
        alert("Bem vindo ao Hotel SWIFTCON");
        entrar_usuario();
        alert("Bem vindo ao Hotel Swiftcon, " + usuario_atual.usuario + ". É um imenso prazer ter você por aqui!");
    }
    
    var escolha = parseInt(prompt('Selecione uma opção: \n1.) Reserva de Quartos \n2.) Cadastro de Hóspedes \n3.) Abastecimento de Carros \n4.) Sair'));
    
    switch (escolha) {
        case 1: reserva_quartos(); break;
        case 2: cadastro_sistema(); break;
        case 3: abastecer_carros(); break;
        case 4: sair(); break;
        default: erro(3); break;
    }
}

// Função para permitir que o usuário faça login
function entrar_usuario() {
    alert('HOTEL SWIFTCON - LOGIN DE USUÁRIO');
    var usuario = prompt("Insira seu usuário:");
    if (!SISTEMA.some(hospede => hospede.usuario === usuario)) {
        erro(1);
        return inicio(true); 
    }

    var senha = parseInt(prompt("Insira a sua senha"));
    if (!SISTEMA.some(hospede => hospede.senha === senha)) {
        erro(2);
        return inicio(true); 
    }

    usuario_atual.usuario = usuario;
    usuario_atual.senha = senha;
}

// Função para reservar quartos
function reserva_quartos() {
    alert('HOTEL SWIFTCON - RESERVA DE QUARTOS');

    var valor_diaria = parseFloat(prompt('Insira o valor da sua diária:'));
    if (valor_diaria <= 0.00) return erro(4);

    var qtd_diaria = parseInt(prompt('Qual a quantidade de diárias:'));
    if (qtd_diaria <= 0 || qtd_diaria > 30) return erro(5);

    if (!confirm('Você confirma o valor de R$' + (valor_diaria * qtd_diaria).toFixed(2) + '?')) return reserva_quartos();

    var nome_hospede = prompt('Insira o nome do hóspede:');
    if (!nome_hospede) return erro(6);

    reservar_quarto(nome_hospede);
    quartos_livres_hotel();
    inicio();
}

// Função para exibir os quartos disponíveis
function quartos_livres_hotel() {
    var mensagem = 'Quartos do Hotel:\n' + HOTEL.map(quarto => 
        'Quarto ' + quarto.quarto + ': ' + (quarto.esta_reservado ? 'Reservado' : 'Livre')
    ).join('\n');
    alert(mensagem);
}

// Função para reservar um quarto específico
function reservar_quarto(nome_hospede) {
    var num_quarto = parseInt(prompt('Qual o número do quarto? (1-20)'));
    var quarto = HOTEL.find(reserva => reserva.quarto === num_quarto);

    if (!quarto || quarto.esta_reservado) {
        alert("Quarto " + num_quarto + " já está reservado ou inválido. Escolha outro.");
        return reservar_quarto(nome_hospede);
    }

    quarto.esta_reservado = true;
    quarto.reservado_por = nome_hospede;
    alert("Quarto " + num_quarto + " foi reservado por " + quarto.reservado_por + ".");
}

// Função para cadastrar hóspedes
function cadastro_sistema() {
    alert('HOTEL SWIFTCON - CADASTRO DE HÓSPEDES');

    var escolha = parseInt(prompt('Selecione uma opção: \n1.) Cadastrar Hóspedes \n2.) Pesquisar Hóspedes \n3.) Listar Hóspedes \n4.) Sair'));

    switch(escolha) {
        case 1: cadastrar_hospede(); break;
        case 2: pesquisar_hospede(); break;
        case 3: listar_hospedes(); break;
        case 4: inicio(); break;
        default: erro(3);
    }

    
}

function cadastrar_hospede() {
    var valor_diaria = parseFloat(prompt('Insira o valor padrão de diária:'));
    if (valor_diaria <= 0.00) return erro(4);

    let qtd_gratuidade = 0;
    let qtd_meia = 0;
    let qtd_hospedes = 0;

    var hospede_nome = '';
    for(let i = 0; i < 15 && "PARE" != hospede_nome.toUpperCase(); i++) {
        hospede_nome = prompt('Qual o nome do hóspede (ou digite "PARE" para encerrar):');
        if (!hospede_nome || hospede_nome.toUpperCase() == 'PARE') break;

        var idade_hospede = parseInt(prompt('Qual a idade do hóspede:'));
        if (idade_hospede < 1 || isNaN(idade_hospede)) return erro(6);

        if (idade_hospede < 18) {
            alert(hospede_nome + " possui GRATUIDADE");
            qtd_gratuidade++;
        } else if (idade_hospede > 80) {
            alert(hospede_nome + " possui MEIA");
            qtd_meia++;
        }
        qtd_hospedes++;

        HOSPEDES.push(
            { 
                nome: hospede_nome, 
                idade: idade_hospede 
            }
        );
    }

    alert("O cadastro da hospedagem resultou em:\nValor: R$" + valor_diaria.toFixed(2) + "\nQuantidade de hóspedes com GRATUIDADE: " + qtd_gratuidade + "\nQuantidade de hóspedes com MEIA: " + qtd_meia+"\nQuantidade total de hóspedes cadastrados: " + qtd_hospedes);
    cadastro_sistema();
}

function pesquisar_hospede() {
    var hospede_nome = prompt("Insira o nome do hóspede:");
    if(hospede_nome == '') { erro(6) }

    cadastro_sistema();
}

function listar_hospedes() {

    cadastro_sistema();
}

// Função para abastecer carros
function abastecer_carros() {
    alert('HOTEL SWIFTCON - ABASTECER');
    inicio();
}

// Função para tratar erros
function erro(numero) {
    switch (numero) {
        case 1:
            alert('ERRO: Usuário inválido.');
            break;
        case 2:
            alert('ERRO: Senha inválida.');
            break;
        case 3:
            alert("ERRO: Opção inválida.");
            break;
        case 4:
            alert("ERRO: Valor de diária inválido.");
            break;
        case 5:
            alert("ERRO: Quantidade de dias inválida.");
            break;
        case 6:
            alert("ERRO: Nome inválido.");
            break;
        case 7:
            alert("ERRO: String inválida.");
            break;
        case 8:
            alert("ERRO: Integer inválido.");
            break;
        case 8:
            alert("ERRO: Float inválido.");
            break;
        default:
            alert("ERRO: Inválido");
            break;
    }
    inicio();
}

// Função para encerrar o sistema
function sair() {
    if (confirm('Você deseja sair?')) {
        alert("Muito obrigado e até logo, " + usuario_atual.usuario + ".");
        window.close();
    } else {
        inicio();
    }
}

// Inicia o sistema
inicio(true);
