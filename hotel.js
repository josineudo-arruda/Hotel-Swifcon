var SISTEMA = [
    { usuario: '2678', senha: 2678 },
    { usuario: '1234', senha: 1234 }
]; // Formato de Banco de Dados 'json'

var HOSPEDES = [];
var HOTEL = Array.from({ length: 20 }, (_, i) => ({
    quarto: i + 1,
    esta_reservado: false,
    reservado_por: ''
})); // Criando 20 quartos

var usuario_atual = { usuario: '', senha: 0 }; // Salvar globalmente cookie de acesso

function inicio(novo_user) {
    if (novo_user) {
        alert("Bem vindo ao Hotel Swiftcon");
        entrar_usuario();
        alert("Bem vindo ao Hotel Swiftcon, " + usuario_atual.usuario + ". É um imenso prazer ter você por aqui!");
    }
    
    var escolha = parseInt(prompt('Selecione uma opção: 1.) Reserva de Quartos 2.) Cadastro de Hóspedes 3.) Abastecimento de Carros 4.) Sair'));
    
    switch (escolha) {
        case 1: reserva_quartos(); break;
        case 2: cadastro_SISTEMA(); break;
        case 3: abastecer_carros(); break;
        case 4: sair(); break;
        default: erro(3); break;
    }
}

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

function quartos_livres_hotel() {
    var mensagem = 'Quartos do Hotel:\n' + HOTEL.map(quarto => 
        'Quarto ' + quarto.quarto + ': ' + (quarto.esta_reservado ? 'Reservado' : 'Livre')
    ).join('\n');
    alert(mensagem);
}

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

function cadastro_SISTEMA() {
    alert('HOTEL SWIFTCON - CADASTRO DE HÓSPEDES');

    var valor_diaria = parseFloat(prompt('Insira o valor padrão de diária:'));
    if (valor_diaria <= 0.00) return erro(4);

    let qtd_gratuidade = 0;
    let qtd_meia = 0;

    while (true) {
        var hospede_nome = prompt('Qual o nome do hóspede (ou digite "PARE" para encerrar):');
        if (!hospede_nome || hospede_nome.toUpperCase() === 'PARE') break;

        var idade_hospede = parseInt(prompt('Qual a idade do hóspede:'));
        if (idade_hospede < 1) return erro(6);

        if (idade_hospede < 18) {
            alert(hospede_nome + " possui GRATUIDADE");
            qtd_gratuidade++;
        } else if (idade_hospede > 80) {
            alert(hospede_nome + " possui MEIA");
            qtd_meia++;
        }

        HOSPEDES.push({ nome: hospede_nome, idade: idade_hospede });
    }

    alert("O cadastro da hospedagem resultou em:\nValor: R$" + valor_diaria.toFixed(2) + "\nQuantidade de hóspedes que têm direito a GRATUIDADE: " + qtd_gratuidade + "\nQuantidade de hóspedes que têm direito a MEIA: " + qtd_meia);
    inicio();
}

function abastecer_carros() {
    alert('HOTEL SWIFTCON - ABASTECER');
    inicio();
}

function erro(numero) {
    const mensagens = {
        1: 'ERRO: Usuário inserido inválido.',
        2: 'ERRO: Senha inserida inválida.',
        3: "ERRO: Insira um valor válido para as opções.",
        4: "ERRO: Insira um valor válido para diária (Maior que ZERO).",
        5: "ERRO: Insira um valor válido para os dias (Maior que ZERO e menor que 30).",
        6: "ERRO: Insira um valor válido para nome (Diferente de NULL)."
    };
    alert(mensagens[numero] || "ERRO: Inválido");
    inicio();
}

function sair() {
    if (confirm('Você deseja sair?')) {
        alert("Muito obrigado e até logo, " + usuario_atual.usuario + ".");
        window.close();
    } else {
        inicio();
    }
}

inicio(true);
