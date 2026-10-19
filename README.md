# Dreams: Monólito

Implementação monolítica da aplicação de compra de pacotes de viagem (voos, hotéis e pacotes) usada como um dos dois estudos de caso do TCC [Arquitetura de Microsserviços: Projetos, Padrões e Princípios](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf) (UFR, 2022).

O mesmo domínio foi depois dividido em microsserviços no repositório [dreams-project-microservices](https://github.com/christiancesar/dreams-project-microservices). Comparar os dois é o objetivo do trabalho.

Versão em inglês: [README.en.md](README.en.md)

## Stack

- TypeScript e Node.js
- Express, com `express-async-errors` para tratar erros assíncronos
- Prisma com MongoDB (MongoDB Atlas)
- tsyringe para injeção de dependência
- SDK do Amadeus para busca de voos e hotéis

## Arquitetura

O projeto segue arquitetura hexagonal, com DDD para separar os domínios. Cada domínio fica em `src/modules/<domínio>` e tem a mesma estrutura:

```
src/modules/flights/
├── controllers/     # recebe a requisição HTTP e chama o serviço
├── dtos/            # formatos de entrada e saída
├── entities/        # entidade do domínio
├── repositories/
│   ├── interfaces/  # contrato de persistência
│   └── implementations/  # implementação com Prisma
├── routes/          # rotas Express do domínio
└── services/        # regras de negócio, uma classe por caso de uso
```

Pontos principais:

- **Domínios:** `users`, `flights`, `hotels` e `package`. O domínio de pacote usa voos e hotéis para montar a oferta.
- **Portas e adaptadores:** os provedores externos ficam atrás de interfaces em `src/shared/containers/providers`. Por exemplo, `IFlightProvider` é implementado por `FlightAmadeusProvider`. Trocar o provedor significa criar outra implementação, sem mexer nos serviços.
- **Injeção de dependência:** `src/shared/containers` registra as implementações com tsyringe.
- **Compartilhado:** `src/shared` guarda erros, middlewares e containers usados por mais de um domínio.
- **Persistência:** `prisma/schema.prisma` define os modelos `User`, `Flight`, `Hotel` e `Package`, cada um mapeado para uma coleção MongoDB.

## Rotas

A API roda em `http://localhost:3333`. As rotas são montadas em `src/routes.ts`.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/users` | Cadastra um usuário |
| GET | `/users` | Lista usuários |
| GET | `/users/:userId` | Mostra um usuário |
| PATCH | `/users` | Atualiza cadastro |
| GET | `/flights/offers` | Busca ofertas de voo (corpo em JSON) |
| POST | `/flights` | Registra o voo escolhido |
| GET | `/flights` | Lista voos registrados |
| GET | `/flights/:flightId` | Mostra um voo |
| GET | `/flights/user/:userId` | Voos de um usuário |
| GET | `/hotels/offers` | Busca ofertas de hotel (corpo em JSON) |
| POST | `/hotels` | Registra o hotel escolhido |
| GET | `/hotels` | Lista hotéis registrados |
| GET | `/hotels/:hotelId` | Mostra um hotel |
| POST | `/packages` | Monta e registra um pacote |
| GET | `/packages/offers` | Busca ofertas de pacote |
| GET | `/packages/user/:userId` | Pacotes de um usuário |

Exemplo de busca de voos:

```bash
curl -X GET http://localhost:3333/flights/offers \
  -H "Content-Type: application/json" \
  -d '{
    "originLocationCode": "CGB",
    "destinationLocationCode": "GRU",
    "departureDate": "2022-12-10",
    "adults": 1,
    "travelClass": "ECONOMY"
  }'
```

O arquivo `doc/endpoints-insomnia.json` exporta todas as requisições para o Insomnia.

## Pré-requisitos

- Node.js LTS e Yarn
- Cluster MongoDB (MongoDB Atlas ou local com replica set, exigido pelo Prisma)
- Credenciais da API Amadeus (`AMADEUS_CLIENT_ID` e `AMADEUS_CLIENT_SECRET`)

## Como executar

1. Clone o repositório e instale as dependências:

   ```bash
   yarn install
   ```

2. Crie um arquivo `.env` na raiz. Este projeto não tem `.env.example`, então use estas variáveis:

   ```env
   DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/dreams"
   AMADEUS_CLIENT_ID=<seu-client-id>
   AMADEUS_CLIENT_SECRET=<seu-client-secret>
   ```

3. Gere o cliente Prisma e sincronize o schema com o banco:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

   MongoDB não usa migrations, por isso o comando é `db push`.

4. Suba o servidor:

   ```bash
   yarn dev:server
   ```

   O servidor responde em `http://localhost:3333`.

## Limitações conhecidas

- **Amadeus:** o Amadeus Self-Service, usado no TCC, foi encerrado em julho de 2026. Sem acesso Enterprise, as rotas de `offers` não retornam dados externos. As demais rotas funcionam com dados salvos no banco.
- **Script `prisma:migrate`:** o `package.json` aponta para `./src/providers/prisma/schema.prisma`, que não existe. O schema real está em `prisma/schema.prisma`, então use `npx prisma db push` como acima.
- **Stripe:** a dependência `stripe` está no `package.json`, mas não é usada no código. O domínio de pagamento não entrou na implementação, como o TCC explica na seção 3.1.2.

## Documentação

- Artigo completo: [TCC em PDF](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf)
- Estrutura de diretórios: `doc/directories-tree.md`
- Schemas de voo e hotel: `doc/flightsSchema.json` e `doc/hotelsSchema.json`
