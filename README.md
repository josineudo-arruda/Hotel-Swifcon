# PonteTerabithia

Invente um nome para o Hotel. 
Ao acessar o sistema, exiba "Bem vindo ao {Hotel}".
Ao acessar o sistema, pergunte o nome do usuário e uma senha. O nome do usuário não precisa de validação. A senha deve ser 2678.  
Na função "inicio", utilize escolha/caso (switch/case) para validar a opção escolhida pelo do usuário.
Sempre que o usuário acessar o sistema, diga "Bem vindo ao Hotel {Hotel}, {Nome}. É um imenso prazer ter você por aqui!".
Substituir a expressão {Hotel} pelo nome do hotel informado pelo em todos os pontos do código.
Sempre que o usuário sair do sistema, exiba a mensagem "Muito obrigado e até logo, {Nome}."
Para cada escolha que o usuário fizer no menu principal, deve ser desenvolvido um programa seguindo as instruções abaixo. Esse programa deve ser criado utilizando uma função principal como chamada. Todo o restante é feito com sua liberdade.
Atualize o menu de opções e a função inicio com todas as opções de programas abaixo. 
Atualize a função "erro" com as novas opções do menu.
Ao encerrar qualquer programa abaixo, sempre retorne ao menu inicial. 

1) Quantos quartos são?
Todo hotel precisava reservar quartos. 
Então vamos começar por isso. 

Considere que o hotel possui 20 quartos e ao iniciar o programa todos estão livres. 

Desenvolva um programa que: 
1) Receba o valor de uma diária no hotel e a quantidade de dias de hospedagem. Valide as informações, ou seja, impeça que o usuário informe dados inválidos, de maneira que o valor da diária não seja negativo e que a quantidade de dias não seja nem negativa, nem maior que 30. 
Em caso de informação inválida escreva na tela “Valor Inválido” e volte ao inicio do programa. 

2) Em seguida, caso o usuário tenha informado um valor correto, pergunte o nome do hóspede. 

3) Agora será informado o número do quarto (de 1 a 20); A informação deve ser armazenada e se outro hóspede tentar ocupar um quarto já ocupado o sistema informará “Quarto já está ocupado”. No caso de um quarto ocupado, deve ser oferecido ao usuário a escolha de outro quarto. 

4)O próximo passo é perguntar se o usuário confirma a reserva. Caso não aceite, volte ao menu inicial. 

Exemplo 1:
Programa pergunta   =>  "Qual o valor padrão da diária?"
Resposta do usuário =>  -12
Programa exibe         =>   “Valor inválido, {Nome}”

Exemplo 2:
Programa pergunta   =>  "Qual o valor padrão da diária?"
Resposta do usuário =>   55.0
Programa pergunta   =>  "Quantas diárias serão necessárias?"
Resposta do usuário =>  10
Programa exibe         =>  "O valor de 10 dias de hospedagem é de R$550.0"
Programa pergunta   =>  "Qual o nome do hóspede?"
Resposta do usuário =>  Carlos Moreira
Programa pergunta   =>  "Qual o quarto para reserva? (1 - 20)?"
Resposta do usuário =>  7
Programa exibe         =>  "Quarto Livre."
Programa pergunta   =>  "{Nome}, você confirma a hospedagem para Carlos Moreira por 10 dias para o quarto 7 por R$550.0? S/N"
Resposta do usuário =>  S
Programa exibe         =>  "{Nome}, reserva efetuada para Carlos Moreira."
Programa exibe         =>  Lista de quartos e suas ocupações "1- livre; 2- livre; 3- livre; 4- livre; 5-ocupado; 6- livre; 7- ocupado; 8- livre; 9- livre; 10-livre; 11- livre; 12- livre; 13- livre; 14- livre; 15-livre; 16- livre; 17- livre; 18- livre; 19- livre; 20-ocupado"

Exemplo 3:
Programa pergunta   =>  "Qual o valor padrão da diária?"
Resposta do usuário =>  55.0
Programa pergunta   =>  "Quantas diárias serão necessárias?"
Resposta do usuário =>  10
Programa exibe         =>  "O valor de 10 dias de hospedagem é de R$550.0"
Programa pergunta   =>  "Qual o nome do hóspede?"
Resposta do usuário =>  Carlos Moreira
Programa pergunta   =>  "Qual o quarto para reserva? (1 - 20)?"
Resposta do usuário =>  2
Programa exibe         =>  "Quarto está ocupado. Escolha outro."
Programa exibe         =>  Lista de quartos e suas ocupações "1- livre; 2- livre; 3- livre; 4- livre; 5-ocupado; 6- livre; 7- ocupado; 8- livre; 9- livre; 10-livre; 11- livre; 12- livre; 13- livre; 14- livre; 15-livre; 16- livre; 17- livre; 18- livre; 19- livre; 20-ocupado"
Programa pergunta   =>  "Qual o quarto para reserva? (1 - 20)?"
Resposta do usuário =>  7
Programa exibe         =>  "Quarto Livre."
Programa pergunta   =>  "{Nome}, você confirma a hospedagem para Carlos Moreira por 10 dias para o quarto 7 por R$550.0 ? S/N"
Resposta do usuário =>  S
Programa exibe         =>  "{Nome}, reserva efetuada para Carlos Moreira."
Programa exibe         =>  Lista de quartos e suas ocupações "1- livre; 2- livre; 3- livre; 4- livre; 5-ocupado; 6- livre; 7- ocupado; 8- livre; 9- livre; 10-livre; 11- livre; 12- livre; 13- livre; 14- livre; 15-livre; 16- livre; 17- livre; 18- livre; 19- livre; 20-ocupado"
