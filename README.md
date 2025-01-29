# Golden Raspberry Awards Project

## Descrição

Este projeto é uma API para gerenciar os prêmios Golden Raspberry Awards.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/nandorfreitas/golden-awards-project
```

Entre no diretório do projeto

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

Para rodar os testes localmente, rode o seguinte comando

```bash
  npm run test
```

## Documentação da API

### A aplicação está hospedada em um serviço free com restrições. O serviço fica frequentemente fora do ar por inatividade. Nesses casos as primeiras requisições podem retornar erro ou demorar em torno de 60 segundos para responder.

#### Retorna o token de autorização de uso da API. Para fins de teste utilizar o name = userExample

```http
  POST https://golden-awards-project.onrender.com/api/login
```

| Parâmetro | Tipo     | Descrição     |
| :-------- | :------- | :------------ |
| `name`    | `string` | _Obrigatório_ |

### Todas as requisições exigem o envio do token via Headers['Authorization']

#### Retorna os produtores com maior e menor intervalo entre dois prêmios

```http
  GET https://golden-awards-project.onrender.com/api/indications/awards-intervals
```

#### Retorna todas as indicações

```http
  GET https://golden-awards-project.onrender.com/api/indications
```

#### Retorna uma indicação

```http
  GET https://golden-awards-project.onrender.com/api/indication/{id}
```

| Parâmetro | Tipo     | Descrição     |
| :-------- | :------- | :------------ |
| `id`      | `string` | _Obrigatório_ |

#### Cria uma nova indicação

```http
  POST https://golden-awards-project.onrender.com/api/indication
```

| Parâmetro   | Tipo      | Descrição                                               |
| :---------- | :-------- | :------------------------------------------------------ |
| `year`      | `string`  | _Obrigatório_                                           |
| `title`     | `string`  | _Obrigatório_                                           |
| `studios`   | `string`  | _Obrigatório_. Em caso de múltiplos separar por vírgula |
| `producers` | `string`  | _Obrigatório_. Em caso de múltiplos separar por vírgula |
| `winner`    | `boolean` | _Obrigatório_                                           |

#### Edita uma indicação

```http
  PUT https://golden-awards-project.onrender.com/api/indication/{id}
```

| Parâmetro   | Tipo      | Descrição                                               |
| :---------- | :-------- | :------------------------------------------------------ |
| `id`        | `string`  | _Obrigatório_                                           |
| `year`      | `string`  | _Obrigatório_                                           |
| `title`     | `string`  | _Obrigatório_                                           |
| `studios`   | `string`  | _Obrigatório_. Em caso de múltiplos separar por vírgula |
| `producers` | `string`  | _Obrigatório_. Em caso de múltiplos separar por vírgula |
| `winner`    | `boolean` | _Obrigatório_                                           |

#### Remove uma indicação

```http
  DELETE https://golden-awards-project.onrender.com/api/indication/{id}
```

| Parâmetro | Tipo     | Descrição     |
| :-------- | :------- | :------------ |
| `id`      | `string` | _Obrigatório_ |

## Stack utilizada

**Back-end:** Node, Express

## Autores

- [Fernando Freitas](https://www.github.com/nandorfreitas)
