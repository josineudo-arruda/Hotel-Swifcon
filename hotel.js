// Definição do banco de dados de usuários
var SISTEMA = [
    { usuario: '2678', senha: 2678 },
    { usuario: '1234', senha: 1234 }
]; // Formato de Banco de Dados 'json'

// Array para armazenar os hóspedes
var HOSPEDES = [];

// Criação de 20 quartos do hotel, inicializando o estado de cada quarto
var HOTEL = [];
for (let i = 1; i <= 20; i++) { 
    HOTEL.push({
        quarto: i,
        esta_reservado: false,
        reservado_por: ''
    });
}

// Objeto para armazenar o usuário atual
var usuario_atual = { usuario: '', senha: 0 }; // Salvar globalmente cookie de acesso

// Função para iniciar o sistema
function inicio(novo_user) {
    if (novo_user) {
        alert("Bem vindo ao Hotel Swiftcon");
        entrar_usuario(); // Chama a função para entrada de usuário
        alert("Bem vindo ao Hotel Swiftcon, " + usuario_atual.usuario + ". É um imenso prazer ter você por aqui!");
    }
    
    // Solicita ao usuário que escolha uma opção
    var escolha = parseInt(prompt('Selecione uma opção: 1.) Reserva de Quartos 2.) Cadastro de Hóspedes 3.) Abastecimento de Carros 4.) Sair'));
    
    // Chama a função apropriada com base na escolha do usuário
    switch (escolha) {
        case 1: reserva_quartos(); break; // Reserva de quartos
        case 2: cadastro_SISTEMA(); break; // Cadastro de hóspedes
        case 3: abastecer_carros(); break; // Abastecimento de carros
        case 4: sair(); break; // Sair do sistema
        default: erro(3); break; // Chama erro para opções inválidas
    }
}

// Função para permitir que o usuário faça login
function entrar_usuario() {
    alert('HOTEL SWIFTCON - LOGIN DE USUÁRIO');
    var usuario = prompt("Insira seu usuário:"); // Solicita o nome de usuário
    // Verifica se o usuário existe no sistema
    if (!SISTEMA.some(hospede => hospede.usuario === usuario)) {
        erro(1); // Chama erro se o usuário não existir
        return inicio(true); 
    }

    var senha = parseInt(prompt("Insira a sua senha")); // Solicita a senha
    // Verifica se a senha está correta
    if (!SISTEMA.some(hospede => hospede.senha === senha)) {
        erro(2); // Chama erro se a senha estiver errada
        return inicio(true); 
    }

    // Armazena o usuário atual
    usuario_atual.usuario = usuario;
    usuario_atual.senha = senha;
}

// Função para reservar quartos
function reserva_quartos() {
    alert('HOTEL SWIFTCON - RESERVA DE QUARTOS');

    // Solicita o valor da diária
    var valor_diaria = parseFloat(prompt('Insira o valor da sua diária:'));
    if (valor_diaria <= 0.00) return erro(4); // Verifica se o valor é válido

    // Solicita a quantidade de diárias
    var qtd_diaria = parseInt(prompt('Qual a quantidade de diárias:'));
    if (qtd_diaria <= 0 || qtd_diaria > 30) return erro(5); // Verifica se a quantidade é válida

    // Confirma o valor total da reserva
    if (!confirm('Você confirma o valor de R$' + (valor_diaria * qtd_diaria).toFixed(2) + '?')) return reserva_quartos();

    // Solicita o nome do hóspede
    var nome_hospede = prompt('Insira o nome do hóspede:');
    if (!nome_hospede) return erro(6); // Verifica se o nome é válido

    // Chama a função para reservar um quarto
    reservar_quarto(nome_hospede);
    quartos_livres_hotel(); // Exibe os quartos disponíveis
    inicio(); // Volta ao menu principal
}

// Função para exibir os quartos disponíveis
function quartos_livres_hotel() {
    // Gera uma mensagem com a situação de cada quarto
    var mensagem = 'Quartos do Hotel:\n' + HOTEL.map(quarto => 
        'Quarto ' + quarto.quarto + ': ' + (quarto.esta_reservado ? 'Reservado' : 'Livre')
    ).join('\n');
    alert(mensagem); // Exibe a mensagem
}

// Função para reservar um quarto específico
function reservar_quarto(nome_hospede) {
    var num_quarto = parseInt(prompt('Qual o número do quarto? (1-20)')); // Solicita o número do quarto
    var quarto = HOTEL.find(reserva => reserva.quarto === num_quarto); // Encontra o quarto correspondente

    // Verifica se o quarto é válido e se já está reservado
    if (!quarto || quarto.esta_reservado) {
        alert("Quarto " + num_quarto + " já está reservado ou inválido. Escolha outro.");
        return reservar_quarto(nome_hospede); // Solicita um novo número de quarto
    }

    // Reserva o quarto
    quarto.esta_reservado = true;
    quarto.reservado_por = nome_hospede; // Armazena o nome do hóspede
    alert("Quarto " + num_quarto + " foi reservado por " + quarto.reservado_por + ".");
}

// Função para cadastrar hóspedes
function cadastro_SISTEMA() {
    alert('HOTEL SWIFTCON - CADASTRO DE HÓSPEDES');

    // Solicita o valor da diária padrão
    var valor_diaria = parseFloat(prompt('Insira o valor padrão de diária:'));
    if (valor_diaria <= 0.00) return erro(4); // Verifica se o valor é válido

    let qtd_gratuidade = 0; // Contador de hóspedes com gratuidade
    let qtd_meia = 0; // Contador de hóspedes com meia entrada

    // Loop para cadastrar hóspedes
    while (true) {
        var hospede_nome = prompt('Qual o nome do hóspede (ou digite "PARE" para encerrar):');
        if (!hospede_nome || hospede_nome.toUpperCase() === 'PARE') break; // Encerra se "PARE" for digitado

        var idade_hospede = parseInt(prompt('Qual a idade do hóspede:')); // Solicita a idade
        if (idade_hospede < 1) return erro(6); // Verifica se a idade é válida

        // Verifica se o hóspede tem direito a gratuidade ou meia
        if (idade_hospede < 18) {
            alert(hospede_nome + " possui GRATUIDADE");
            qtd_gratuidade++;
        } else if (idade_hospede > 80) {
            alert(hospede_nome + " possui MEIA");
            qtd_meia++;
        }

        // Adiciona o hóspede ao array
        HOSPEDES.push({ nome: hospede_nome, idade: idade_hospede });
    }

    // Exibe resumo do cadastro
    alert("O cadastro da hospedagem resultou em:\nValor: R$" + valor_diaria.toFixed(2) + "\nQuantidade de hóspedes que têm direito a GRATUIDADE: " + qtd_gratuidade + "\nQuantidade de hóspedes que têm direito a MEIA: " + qtd_meia);
    inicio(); // Volta ao menu principal
}

// Função para abastecer carros (ainda sem implementação específica)
function abastecer_carros() {
    alert('HOTEL SWIFTCON - ABASTECER');
    inicio(); // Volta ao menu principal
}

// Função para tratar erros
function erro(numero) {
    // Mapeia os números de erro para mensagens
    let mensagem;

    switch (numero) {
        case 1:
            mensagem = 'ERRO: Usuário inserido inválido.';
            break;
        case 2:
            mensagem = 'ERRO: Senha inserida inválida.';
            break;
        case 3:
            mensagem = "ERRO: Insira um valor válido para as opções.";
            break;
        case 4:
            mensagem = "ERRO: Insira um valor válido para diária (Maior que ZERO).";
            break;
        case 5:
            mensagem = "ERRO: Insira um valor válido para os dias (Maior que ZERO e menor que 30).";
            break;
        case 6:
            mensagem = "ERRO: Insira um valor válido para nome (Diferente de NULL).";
            break;
        default:
            mensagem = "ERRO: Inválido";
            break;
    }

    alert(mensagem); // Exibe a mensagem de erro
    inicio(); // Volta ao menu principal
}

// Função para encerrar o sistema
function sair() {
    // Pergunta se o usuário deseja sair
    if (confirm('Você deseja sair?')) {
        alert("Muito obrigado e até logo, " + usuario_atual.usuario + "."); // Mensagem de despedida
        window.close(); // Fecha a janela (se permitido)
    } else {
        inicio(); // Volta ao menu principal
    }
}

// Inicia o sistema, permitindo que um novo usuário entre
inicio(true);
