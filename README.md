

# 📍Plataforma de Pontos de Interesse (POI) por CEP. 🛰️
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/github/repo-size/IgorCavalcantiMoura/gps-poi-locator?style=for-the-badge" alt="GitHub repo size"/>
  <img src="https://img.shields.io/github/languages/count/IgorCavalcantiMoura/gps-poi-locator?style=for-the-badge" alt="GitHub language count"/>
  <img src="https://img.shields.io/github/forks/IgorCavalcantiMoura/gps-poi-locator?style=for-the-badge" alt="GitHub forks"/>
  <img src="https://img.shields.io/bitbucket/issues/IgorCavalcantiMoura/gps-poi-locator?style=for-the-badge" alt="Bitbucket open issues"/>
  <img src="https://img.shields.io/bitbucket/pr-raw/IgorCavalcantiMoura/gps-poi-locator?style=for-the-badge" alt="Bitbucket open pull requests"/>
</p>


Este projeto é uma API RESTful desenvolvida para fornecer funcionalidades para cadastrar e localizar pontos de interesse (POIs) com base na proximidade de um CEP.

<p align="center">
  <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3JjOG1tMHFqMTdtaWg0MTJodnVydmh6NHNwdm8yNmZwOXpvaXpxbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzMfJIkTZgx8s/giphy.webp"/>
</p>


## 📋 Requisitos do Projeto
- Cadastrar Pontos de Interesse: Nome e CEP.
- Listar Todos os POIs: Exibe todos os pontos cadastrados.
- Listar POIs por Proximidade: Encontra POIs dentro de uma distância especificada a partir de um CEP de referência.

## 🛠️ Tecnologias Utilizadas
- Nest.js: Framework para a criação de APIs com Node.js.
- MySQL: Banco de dados relacional para armazenar os POIs.
- TypeORM: ORM utilizado para a interação com o banco de dados.
- Awesome API CEP: Serviço para obter coordenadas geográficas com base no CEP.

## ⚙️ Pré-requisitos
Para rodar o projeto localmente, é necessário ter instalado:

- Node.js
- MySQL
  
## 🚀 Rodando o Projeto
<details>
<summary>1 - Clonar o Repositório</summary>
  
#### 
```
git clone https://github.com/sua-conta/poi-cep-api.git
cd poi-cep-api
```
</details>

<details>
  <summary>2. Configurar o Banco de Dados</summary>
  
Crie um banco de dados no MySQL e configure o arquivo ormconfig.json:

```
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "seu-usuario",
  "password": "sua-senha",
  "database": "nome_do_banco",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```
</details>
<details>
  <summary>3. Instalar Dependências</summary>

```
npm run start
```
A API estará disponível em http://localhost:5000.

</details>

## 🔍 Endpoints
<details>
  <summary>1. Cadastrar Pontos de Interesse</summary>

- URL: /pois
- Método: POST
- Corpo da Requisição:
```
{
  "nome": "Lanchonete",
  "cep": "01001000"
}

```
- Resposta de sucesso:

```
{
  "id": 1,
  "nome": "Lanchonete",
  "cep": "01001000"
}
```
</details>
<details>
  <summary>2. Listar Todos os Pontos de Interesse</summary>
  
#### 
- URL: /pois
- Método: GET
- Resposta de Sucesso:
```
[
  {
    "id": 1,
    "nome": "Lanchonete",
    "cep": "01001000"
  },
  {
    "id": 2,
    "nome": "Posto",
    "cep": "02020020"
  }
]

```
</details>
<details>
  <summary>3. Listar POIs por Proximidade</summary>

- URL: /pois/nearby
- Método: GET
- Parâmetros de Query:
  - cep: CEP de referência (ex: 01001000)
  - maxDistance: Distância máxima em quilômetros (ex: 10)
Exemplo de URL:
```
http://localhost:3000/pois/nearby?cep=01001000&maxDistance=10
```
- Resposta de Sucesso:
```
[
  {
    "id": 1,
    "nome": "Lanchonete",
    "cep": "01001000"
  },
  {
    "id": 3,
    "nome": "Joalheria",
    "cep": "01500010"
  }
]
```
</details>

## 📝 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para contribuir!


