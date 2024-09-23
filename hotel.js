// =====================
// Definição do Banco de Dados
// =====================

var SISTEMA = [
    { usuario: '2678', senha: 2678 },
    { usuario: '1234', senha: 1234 },
    { usuario: 'guest1', senha: 1111 },
    { usuario: 'admin', senha: 12345 }
];

var HOSPEDES = [
    { nome: 'João Silva', idade: 30 },
    { nome: 'Maria Oliveira', idade: 25 },
    { nome: 'Carlos Souza', idade: 15 },
    { nome: 'Ana Costa', idade: 85 },
    { nome: 'Pedro Almeida', idade: 40 },
    { nome: 'Fernanda Lima', idade: 28 },
    { nome: 'Luiz Pereira', idade: 60 }, 
    { nome: 'Juliana Santos', idade: 22 },
    { nome: 'Ricardo Mendes', idade: 35 },
    { nome: 'Camila Rocha', idade: 18 },
    { nome: 'Thiago Martins', idade: 10 },
    { nome: 'Renata Ribeiro', idade: 55 },
    { nome: 'Gabriel Ferreira', idade: 12 },
    { nome: 'Sofia Almeida', idade: 45 },
    { nome: 'Felipe Costa', idade: 20 },
    { nome: 'Tânia Silva', idade: 78 }
];

var EVENTOS = [];

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

// =====================
// Funções Principais
// =====================

// Função para iniciar o sistema
function inicio(novo_user) {
    if (novo_user) {
        entrar_usuario();
        alert("HOTEL SWIFTCON - INICIO\n\nBem vindo ao Hotel Swiftcon, " + usuario_atual.usuario + ". É um imenso prazer ter você por aqui!");
    }

    var escolha = parseInt(prompt('HOTEL SWIFTCON - INICIO\n\nSelecione uma opção: \n1.) Reserva de Quartos \n2.) Sistema de Hóspedes \n3.) Gestão de Eventos \n4.) Abastecimento de Carros \n5.) Comprar Ar-condicionado \n6.) Sair'));

    switch (escolha) {
        case 1: reserva_quartos(); break;
        case 2: cadastro_sistema(); break;
        case 3: gerenciar_eventos(); break;
        case 4: abastecer_carros(); break;
        case 5: comprar_arCondicionado(); break;
        case 6: sair(); break;
        default: erro(4); break;
    }
}

// Função para permitir que o usuário faça login
function entrar_usuario() {
    var usuario = prompt("HOTEL SWIFTCON - LOGIN DE USUÁRIO\n\nInsira seu usuário:");
    if (!SISTEMA.some(hospede => hospede.usuario == usuario)) {
        erro(1);
        listar_usuarios();
        inicio(true); 
    }

    var senha = parseInt(prompt("HOTEL SWIFTCON - LOGIN DE USUÁRIO\n\nInsira a sua senha"));
    if (!SISTEMA.some(hospede => hospede.senha == senha)) {
        erro(2);
        listar_usuarios();
        inicio(true); 
    }

    usuario_atual.usuario = usuario;
    usuario_atual.senha = senha;
}

function listar_usuarios() {
    var mensagem = 'HOTEL SWIFTCON\n\nA lista de Usuários cadastrados:\n';
    for (let i = 0; i < SISTEMA.length; i++) {
        mensagem += ("User: "+ (SISTEMA[i].usuario) + " - Senha:" + (SISTEMA[i].senha) + "\n");
    }

    alert(mensagem);
}

// =====================
// Funções de Reserva de Quartos
// =====================

function reserva_quartos() {

    var valor_diaria = parseFloat(prompt('HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nInsira o valor da sua diária:'));
    if (valor_diaria <= 0.00 || isNaN(valor_diaria)) {
        erro(3);
        reserva_quartos();
    };

    var qtd_diaria = parseInt(prompt('HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nQual a quantidade de diárias (Menor que 30):'));
    if (qtd_diaria <= 0 || isNaN(qtd_diaria)) {
        erro(2);
        reserva_quartos();
    };
    if(qtd_diaria > 30) {
        alert("ERRO: O Numéro máximo de dias é 30.");
        reserva_quartos();
    }

    if (!confirm('HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nVocê confirma o valor de R$' + (valor_diaria * qtd_diaria).toFixed(2) + '?')) {reserva_quartos();};

    var nome_hospede = prompt('HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nInsira o nome do hóspede:');
    if (!nome_hospede) {
        erro(1);
        reserva_quartos();
    }

    reservar_quarto(nome_hospede);
    quartos_livres_hotel();
    inicio();
}

// Função para exibir os quartos disponíveis
function quartos_livres_hotel() {
    var mensagem = 'HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nQuartos do Hotel:\n' + HOTEL.map(quarto => 'Quarto ' + quarto.quarto + ': ' + (quarto.esta_reservado ? 'Reservado' : 'Livre')).join('\n');
    alert(mensagem);
}

// Função para reservar um quarto específico
function reservar_quarto(nome_hospede) {
    var num_quarto = parseInt(prompt('HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nQual o número do quarto? (1-20)'));
    var quarto = HOTEL.find(reserva => reserva.quarto === num_quarto);

    if (!quarto || quarto.esta_reservado) {
        alert("HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nQuarto " + num_quarto + " já está reservado ou inválido. Escolha outro.");
        return reservar_quarto(nome_hospede);
    }

    quarto.esta_reservado = true;
    quarto.reservado_por = nome_hospede;
    alert("HOTEL SWIFTCON - RESERVA DE QUARTOS\n\nQuarto " + num_quarto + " foi reservado por " + quarto.reservado_por + ".");
}

// =====================
// Funções de Cadastro de Hóspedes
// =====================

function cadastro_sistema() {
    var escolha = parseInt(prompt('HOTEL SWIFTCON - CADASTRO DE HÓSPEDES\n\nSelecione uma opção: \n1.) Cadastrar Hóspedes \n2.) Pesquisar Hóspedes \n3.) Listar Hóspedes \n4.) Sair'));

    switch(escolha) {
        case 1: cadastrar_hospede(); break;
        case 2: pesquisar_hospede(); break;
        case 3: listar_hospedes(); break;
        case 4: inicio(); break;
        default: erro(4);
    }

    inicio();
}

function cadastrar_hospede() {
    var valor_diaria = parseFloat(prompt('HOTEL SWIFTCON - CADASTRO HÓSPEDE\n\nInsira o valor padrão de diária:'));
    if (valor_diaria <= 0.00 || isNaN(valor_diaria)) return erro(9);

    let qtd_gratuidade = 0;
    let qtd_meia = 0;
    let qtd_hospedes = 0;

    var hospede_nome = '';
    for(let i = 0; i < 15 && "PARE" != hospede_nome.toUpperCase(); i++) {
        hospede_nome = prompt('HOTEL SWIFTCON - CADASTRO HÓSPEDE\n\nQual o nome do hóspede (ou digite "PARE" para encerrar):');
        if (!hospede_nome || hospede_nome.toUpperCase() == 'PARE') break;

        var idade_hospede = parseInt(prompt('HOTEL SWIFTCON - CADASTRO HÓSPEDE\n\nQual a idade do hóspede:'));
        if (idade_hospede < 1 || isNaN(idade_hospede)) {
            erro(2);
            cadastrar_hospede();
        } 

        if (idade_hospede < 18) {
            alert("HOTEL SWIFTCON - CADASTRO HÓSPEDE\n\n"+hospede_nome + " possui GRATUIDADE");
            qtd_gratuidade++;
        } else if (idade_hospede > 80) {
            alert("HOTEL SWIFTCON - CADASTRO HÓSPEDE\n\n"+hospede_nome + " possui MEIA");
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

    alert("HOTEL SWIFTCON - CADASTRO HÓSPEDE\n\nO cadastro da hospedagem resultou em:\nValor: R$" + valor_diaria.toFixed(2) + "\nQuantidade de hóspedes com GRATUIDADE: " + qtd_gratuidade + "\nQuantidade de hóspedes com MEIA: " + qtd_meia + "\nQuantidade total de hóspedes cadastrados: " + qtd_hospedes);
    cadastro_sistema();
}

function pesquisar_hospede() {
    var hospede_nome = prompt("HOTEL SWIFTCON - PESQUISAR HÓSPEDE\n\nInsira o nome do hóspede:");
    if (hospede_nome == '') { 
        erro(1); 
        pesquisar_hospede();
    }

    var pesquisa = HOSPEDES.some(hospede => hospede.nome === hospede_nome);
    if (pesquisa) {
        alert("HOTEL SWIFTCON - PESQUISAR HÓSPEDE\n\nHóspede (" + hospede_nome + ") encontrado na lista de cadastrados");
    } else {
        alert("HOTEL SWIFTCON - PESQUISAR HÓSPEDE\n\nHóspede (" + hospede_nome + ") não encontrado na lista de cadastrados");
    }

    cadastro_sistema();
}

function listar_hospedes() {
    var mensagem = 'HOTEL SWIFTCON - LISTAR HÓSPEDES\n\nA lista de Hóspedes cadastrados:\n';
    for (let i = 0; i < HOSPEDES.length; i++) {
        mensagem += (HOSPEDES[i].nome) + "\n";
    }

    if (HOSPEDES.length > 0) {
        alert(mensagem);
    } else {
        alert("HOTEL SWIFTCON - LISTAR HÓSPEDES\n\nHóspedes não cadastrados. Direcionando para o cadastro.");
        cadastrar_hospede();
    }

    cadastro_sistema();
}

// =====================
// Funções de Abastecimento e Eventos
// =====================

function abastecer_carros() {
    var valor_alcool_stark = parseFloat(prompt('HOTEL SWIFTCON - VALOR ÁLCOOL\n\nInsira o valor do combustível a base de álcool no posto do Stark Petrol:'));
    if(valor_alcool_stark <= 0 || isNaN(valor_alcool_stark) || !valor_alcool_stark) {
        erro(3);
        abastecer_carros()
    }

    var valor_alcool_wayne = parseFloat(prompt('HOTEL SWIFTCON - VALOR ÁLCOOL\n\nInsira o valor do combustível a base de álcool no posto do Wayne Oil:'));
    if(valor_alcool_wayne <= 0 || isNaN(valor_alcool_wayne) || !valor_alcool_wayne) {
        erro(3);
        abastecer_carros()
    }

    var valor_gasolina_stark = parseFloat(prompt('HOTEL SWIFTCON - VALOR GASOLINA\n\nInsira o valor do combustível gasolina no posto do Stark Petrol:'));
    if(valor_gasolina_stark <= 0 || isNaN(valor_gasolina_stark) || !valor_gasolina_stark) {
        erro(3);
        abastecer_carros()
    }
    var valor_gasolina_wayne = parseFloat(prompt('HOTEL SWIFTCON - VALOR GASOLINA\n\nInsira o valor do combustível gasolina no posto do Wayne Oil:'));
    if(valor_gasolina_wayne <= 0 || isNaN(valor_gasolina_wayne) || !valor_gasolina_wayne) {
        erro(3);
        abastecer_carros()
    }

    valor_alcool_stark *= 42;
    valor_alcool_wayne *= 42;
    valor_gasolina_stark *= 42;
    valor_gasolina_wayne *= 42;

    valor_alcool_stark = valor_alcool_stark - ((valor_alcool_stark * 30)/100);
    valor_alcool_wayne = valor_alcool_wayne - ((valor_alcool_wayne * 30)/100);

    var valores = [];
    valores.push(
        {
            valor: valor_alcool_stark,
            posto: "Stark Petrol",
            tipo: 'álcool',
            tem_desconto: true
        }
    );
    valores.push(
        {
            valor: valor_gasolina_stark,
            posto: "Stark Petrol",
            tipo: 'gasolina',
            tem_desconto: false
        }
    );
    valores.push(
        {
            valor: valor_alcool_wayne,
            posto: "Wayne Oil",
            tipo: 'álcool',
            tem_desconto: true
        }
    );
    valores.push(
        {
            valor: valor_gasolina_wayne,
            posto: "Wayne Oil",
            tipo: 'gasolina',
            tem_desconto: false
        }
    );

    var menor_preco = {
        valor: valor_alcool_stark * valor_gasolina_wayne * valor_alcool_wayne * valor_gasolina_stark
    };
    for(let i = 0; i < valores.length; i++) {
        if(valores[i].valor < menor_preco.valor) {
            menor_preco = valores[i];
        }
    }

    alert(`HOTEL SWIFTCON - VALOR GASOLINA\n\n${usuario_atual.usuario}, é mais barato abastecer com ${menor_preco.tipo} no posto ${menor_preco.posto}. Por R$${(
        menor_preco.tem_desconto ? ((menor_preco.valor * 100)/70).toFixed(2) : (menor_preco.valor).toFixed(2)
    )}`);
    

    inicio();
}

// =====================
// Funções de ar-condicionado
// =====================

function comprar_arCondicionado() {
    var looping = 'S';
    while(looping === 'S') {
        var nome_empresa = prompt('HOTEL SWIFTCON - ARCONDICIONADO\n\nInsira o nome da empresa:');
        if (nome_empresa == '') { 
            erro(1); 
            comprar_arCondicionado();
        }

        var valor_aparelho = parseFloat(prompt('HOTEL SWIFTCON - ARCONDICIONADO\n\nInsira o valor do aparelho:'));
        if (valor_aparelho < 1 || isNaN(valor_aparelho) || !valor_aparelho) {
            erro(3);
            comprar_arCondicionado();
        }

        var qtd_aparelhos = parseInt(prompt('HOTEL SWIFTCON - ARCONDICIONADO\n\nInsira a quantidade de aparelhos:'));
        if (qtd_aparelhos < 1 || isNaN(qtd_aparelhos) || !qtd_aparelhos) {
            erro(2);
            comprar_arCondicionado();
        }

        var desconto = parseInt(prompt('HOTEL SWIFTCON - ARCONDICIONADO\n\nInsira a porcentagem de desconto: (entre 0 e 100)'));
        if (desconto < 0 || isNaN(desconto) || !desconto || desconto > 100) {
            erro(2);
            comprar_arCondicionado();
        }

        var min_desconto = parseInt(prompt('HOTEL SWIFTCON - ARCONDICIONADO\n\nInsira o número minímo de aparelhos para o desconto:'));
        if (min_desconto < 0 || isNaN(min_desconto) || !min_desconto) {
            erro(2);
            comprar_arCondicionado();
        }

        valor_aparelho *= qtd_aparelhos;
        if(min_desconto > qtd_aparelhos) {
            valor_aparelho = valor_aparelho - ((valor_aparelho*desconto)/100);
        }

        alert(`HOTEL SWIFTCON - ARCONDICIONADO\n\nO serviço de ${nome_empresa} custará R$${valor_aparelho.toFixed(2)}`)

        var escolha = prompt("HOTEL SWIFTCON - ARCONDICIONADO\n\nDeseja continuar? (S/N)");
        if(escolha == "N" || escolha == "n") {looping = "N"}
    }
    

    inicio();
}

// =====================
// Funções de Tratamento de Erros
// =====================


function gerenciar_eventos() {
    var escolha = parseInt(prompt('HOTEL SWIFTCON - GESTÃO DE EVENTOS\n\nSelecione uma opção: \n1.) Informar Evento \n2.) Lista Eventos \n3.) Sair'));

    switch(escolha) {
        case 1: cadastrar_evento(); break;
        case 2: listar_eventos(); break;
        case 3: inicio(); break;
        default: erro(4);
    }

    inicio();
}

function cadastrar_evento() {
    var num_convidados = parseInt(prompt("HOTEL SWIFTCON - CADASTRAR EVENTO\n\nQual o número de convidados para o seu evento?"));
    if(num_convidados <= 0 || isNaN(num_convidados)) {
        erro(1);
        gerenciar_eventos()
    }
    if(num_convidados > 350) {
        alert("ERRO: O Numéro máximo de convidados para o HOTEL SWIFTCON é 350.");
        gerenciar_eventos()
    }
    var auditorio = '';

    if(num_convidados > 220) {
        alert("HOTEL SWIFTCON - CADASTRAR CONVIDADOS\n\nO evento foi agendado no Auditório COLORADO.");
        auditorio = "COLORADO";
    } else {
        alert("HOTEL SWIFTCON - CADASTRAR CONVIDADOS\n\nO evento foi agendado no Auditório LARANJA. "+
            ((num_convidados-150)<=0 ? ("(Sem cadeiras adicionais)") : ("(Com "+(num_convidados-150)+" cadeiras adicionais)")
        ));
        auditorio = ("LARANJA "+((num_convidados-150)<=0 ? ("(Sem cadeiras adicionais)") : ("(Com "+(num_convidados-150)+" cadeiras adicionais")));
    }

    var dia_semana = prompt("HOTEL SWIFTCON - AGENDAR AUDITÓRIO\n\nQue dia da semana é o evento? (ex: segunda-feira)");
    dia_semana = dia_semana.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    if(!dia_semana) {
        erro(1);
        cadastrar_evento();
    }
    if(!['segunda-feira', 'terca-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado', 'domingo'].includes(dia_semana)) {
        alert("ERRO: Dia da semana inválido. Tente por exemplo: quarta-feira");
        cadastrar_evento();
    }

    var horario_inicio = parseInt(prompt("HOTEL SWIFTCON - AGENDAR AUDITÓRIO\n\nQue horas que é o evento? (ex: 15 => 15 horas)"));
    if(horario_inicio <= 0) {
        erro(1);
        cadastrar_evento();
    }
    if(horario_inicio < 7 || horario_inicio == 24) {
        alert("ERRO: Horários indisponíveis. Tente entre 7h a 23h de segunda a sexta e 7h a 15h nos finais de semana.");
        cadastrar_evento();
    }
    if(['sabado', 'domingo'].includes(dia_semana) && (horario_inicio > 15)) {
        alert("ERRO: Horário inválido para final de semana.");
        cadastrar_evento();
    }

    var nome_empresa = prompt("HOTEL SWIFTCON - AGENDAR AUDITÓRIO\n\nQual o nome da empresa do evento?");
    if(!nome_empresa) {
        erro(1);
        cadastrar_evento();
    }

    nome_empresa = nome_empresa.charAt(0).toUpperCase() + nome_empresa.slice(1).toLowerCase();
    dia_semana = dia_semana.charAt(0).toUpperCase() + dia_semana.slice(1).toLowerCase();
    alert("HOTEL SWIFTCON - AGENDAR AUDITÓRIO\n\nAuditório reservado: "+auditorio+"\nDia da Semana: "+dia_semana+"\nHorário de início: "+horario_inicio+"\nNome da Empresa: "+nome_empresa);

    var duracao_evento = parseInt(prompt("HOTEL SWIFTCON - CONTRATO DE GARÇONS\n\nQual é a duração do evento? (ex: 7 => 7 horas)"));
    if(duracao_evento <= 0) {
        erro(1);
        cadastrar_evento();
    }
    var qtd_garcons = Math.ceil(num_convidados/12);
    var valor_funcionarios = qtd_garcons * 10.50;
    valor_funcionarios *= duracao_evento;

    alert("HOTEL SWIFTCON - CONTRATO DE GARÇONS\n\nO contrato de trabalho dos garçons para servir por "+duracao_evento+"h é de R$"+valor_funcionarios.toFixed(2));

    // Por pessoa é R$0,16 de café, R$0,20 de água e R$2,38 por salgado. Totalizando R$2,74 por pessoa.

    var litros_cafe = num_convidados / 5; 
    var litros_agua = num_convidados / 2;
    var salgados = num_convidados * 7;

    alert("HOTEL SWIFTCON - CONTRATO BUFFET\n\nO evento precisará de " + litros_cafe + " litros de café, " + litros_agua + " litros de água, " + salgados + " salgados.");

    var valor_buffet = 2.74 * num_convidados;

    alert(`HOTEL SWIFTCON - AGENDAMENTO FEITO\n
        Evento no Auditório: ${auditorio}
        Nome da Empresa: ${nome_empresa}
        Data: ${dia_semana}, ${horario_inicio}h às ${horario_inicio + duracao_evento}
        Duração do evento: ${duracao_evento}h
        Quantidade de garçons: ${qtd_garcons}
        Quantidade de convidados: ${num_convidados}
        Custo de garçons: R$${valor_funcionarios.toFixed(2)}
        Custo de buffet: R$${valor_buffet.toFixed(2)}
        Valor total: R$${(valor_buffet + valor_funcionarios).toFixed(2)}`);

    var evento = {
        auditorio: auditorio,
        dia_semana: dia_semana,
        horario_inicio: horario_inicio,
        nome_empresa: nome_empresa.charAt(0).toUpperCase() + nome_empresa.slice(1).toLowerCase(),
        num_convidados: num_convidados,
        qtd_garcons: qtd_garcons,
        custo_funcionarios: valor_funcionarios,
        custo_buffet: valor_buffet,
        custo_total: (valor_buffet + valor_funcionarios)
    };

    EVENTOS.push(evento);
}

function listar_eventos() {
    if (EVENTOS.length === 0) {
        alert("Nenhum evento cadastrado.");
        return;
    }

    let mensagem = "Lista de Eventos:\n\n";
    
    EVENTOS.forEach((evento, index) => {
        mensagem += `Evento ${index + 1}:\n`;
        mensagem += `Auditório: ${evento.auditorio}\nDia: ${evento.dia_semana}\nHorário: ${evento.horario_inicio}h\n`;
        mensagem += `Empresa: ${evento.nome_empresa}\nConvidados: ${evento.num_convidados}\nGarçons: ${evento.qtd_garcons}\n`;
        mensagem += `Custo Funcionários: R$${evento.custo_funcionarios.toFixed(2)}\nCusto Buffet: R$${evento.custo_buffet.toFixed(2)}\nTotal: R$${evento.custo_total.toFixed(2)}\n\n`;
    });

    alert(mensagem);
}

// =====================
// Funções de Tratamento de Erros
// =====================

function erro(numero) {
    switch (numero) {
        case 1:
            alert('ERRO: Valor de String inválido.\nVocê usou valores nulos.');
            break;
        case 2:
            alert('ERRO: Valor de Integer inválido.\nVocê usou valores nulos ou negativos.');
            break;
        case 3:
            alert("ERRO: Valor de Float inválido.\nVocê usou valores nulos ou negativos.");
            break;
        case 4:
            alert("ERRO: Opção Inválida.");
            break;
        default:
            alert("ERRO: Inválido");
            break;
    }
}

// =====================
// Função para Encerrar o Sistema
// =====================

function sair() {
    if (confirm('Você deseja sair?')) {
        alert("Muito obrigado e até logo, " + usuario_atual.usuario + ".");
        window.close();
    } else {
        inicio();
    }
}

inicio(true);
