# PetXP - Um backend feito em GraphQL

Um repositório que materializa meus conhecimentos em GRAPHQL, utilizando NodeJS com a framework Express e também se utilizando **MySQL** para persistencia dos dados. Um exemplo simples que espero conseguir contribuir de alguma forma com seus estudos :)

## O que é?

PetXP é uma aplicação que visa aproximar usuários que estão precisando de doar seus pequeninos pets e possíveis interessados em adota-los.

## O que foi implementado?

Foi implementado uma API GraphQL que utiliza apenas um único endpoint do qual é possível realizar uma requisição para registrar um usuário, um pet ou um pedido de adoção, em outras palavras foi feito um CRUD para entidades básicas de nosso sistema (detalhadas a seguir).

## As entidades

Segue o esquema físico de nossos dados(ER Diagram)

![](https://i.ibb.co/QDPSVcN/Untitled-Diagram-7.png)

**Observações**

- Não é possível alterar o TaxRegistry de um usuário

- O único que campo que pode ser alterado de um pedido de adoção é o status do pedido.

- Uma vez que o status do pedido é alterado para "finished"(finalizado) o mesmo não poderá ser mais alterado e sua data de finalização será inserida (campo finishedAt).

## Configurações

- A criação das tabelas é automática para remover tal procedimento altere a linha marcada no arquivo `src/server.js`.

- O servidor está rodando na porta 400.0, mas seja livre para colocar na porta que você quiser.

- O arquivo `env.example` contém um exemplo de como deve ser criado as variáveis de ambiente em um arquivo `.env` para ser realizado a conexão com o banco de dados.

## Exemplo de Requisição/Resposta

![](https://i.ibb.co/3d9HhkJ/Screenshot-1.png)

## Contato

Qualquer coisa pode me chamar no discord ou mesmo mandar um email fica ao seu criterio :)

- Discord: reaborn#8454
- Email: henrique.hott1996@gmail.com
