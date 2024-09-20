# PonteTerabithia

## Descrição do Projeto
Sistema de gerenciamento para um hotel fictício, que permite reservas de quartos e cadastro de hóspedes, entre outras funcionalidades.

## Funcionalidades

- **Login e boas-vindas**
  - Exibe: "Bem vindo ao {Hotel}"
  - Solicita nome do usuário e senha (senha: 2678).
  - Mensagem de boas-vindas personalizada: "Bem vindo ao Hotel {Hotel}, {Nome}. É um imenso prazer ter você por aqui!"
  - Mensagem de despedida ao sair: "Muito obrigado e até logo, {Nome}."

- **Menu Principal**
  - Utiliza a função `inicio` com `switch/case` para as opções.
  - Mensagem de erro em caso de opção inválida.

### Opções do Menu

1. **Quantos quartos são?**
   - Recebe valor da diária e quantidade de dias.
   - Valida: diária não negativa e dias entre 1 e 30.
   - Cadastro de hóspede e reserva de quarto (1 a 20).
   - Exibe status dos quartos (livre/ocupado).

2. **Como soletra?**
   - Cadastro de hóspedes com nome e idade.
   - Gratuidades para menores de 6 anos e meias diárias para maiores de 60.
   - Exibe total de gratuidade, meias e valor total.

3. **Com "S" ou com "Z"?**
   - Menu para cadastrar, pesquisar e listar hóspedes.
   - Limite de 15 cadastros.
   - Mensagens de confirmação e erro.

4. **Que horas você pode?**
   - Reservas de auditórios com verificação de capacidade.
   - Disponibilidade conforme dia da semana e horário.
   - Cálculo de garçons e custos para eventos.
   - Cálculo de buffet e confirmação da reserva.

5. **Álcool ou gasolina?**
   - Comparação de preços de combustíveis entre dois postos.
   - Cálculo da melhor opção de abastecimento.

6. **Ar puro, finalmente.**
   - Cálculo do custo de manutenção de ar-condicionados.
   - Exibição do orçamento de diferentes empresas.
   - Identificação do menor orçamento.

## Como Usar
1. Faça o clone do repositório.
2. Abra o projeto em seu ambiente de desenvolvimento.
3. Execute o programa e siga as instruções no terminal.

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).
