# Endpoints do serviço

| Método | Endpoint                          | Responsabilidade                           |
| ------ | --------------------------------- | ------------------------------------------ |
| POST   | /users                            | Criação de usuário                         |
| GET    | /users                            | Listar todos os usuários                   |
| PATCH  | /users/&lt;id&gt;                 | Atualiza um usuário                        |
| DELETE | /users/&lt;id&gt;                 | Realiza um soft delete no usuário          |
| POST   | /login                            | Gera o token de autenticação               |
| POST   | /categories                       | Criação de categoria                       |
| GET    | /categories                       | Lista todas as categorias                  |
| GET    | /categories/&lt;id&gt;/realEstate | Lista imóveis pertencentes a uma categoria |
| POST   | /realEstate                       | Criação de um imóvel                       |
| GET    | /realEstate                       | Lista todos os imóveis                     |
| POST   | /schedules                        | Agenda uma visita a um imóvel              |
| GET    | /schedules/realEstate/&lt;id&gt;  | Lista todos os agendamentos de um imóvel   |

- Serviço de back-end responsável por gerenciar uma imobiliária utilizando TypeORM e relacionamentos.
- Para rodar a API localmente utilizar a Url base: "http://localhost:3000/"

### **POST: /users**

- Rota responsável pela criação de novo usuário.

**_Regras de negócio_**

- Deve ser possível criar um usuário contendo os seguintes dados:

  - **name**: string.
  - **email**: string.
  - **password**: string.
  - **admin**: boolean.
  - **createdAt**: string.
  - **updatedAt**: string.
  - **deletedAt**: string.

- Não podem ser cadastrados dois usuário com o mesmo e-mail.
- A chave admin é opcional e tem como padrão o valor false.
- Chaves não requeridas na rota serão desconsideradas pelo serviço.
- As chaves createdAt, updatedAt e deletedAt são geradas automaticamente pelo serviço.

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do usuário a ser criado.
  - **Retorno**: Um objeto contendo os dados do usuário, com exceção da hash de senha.
  - **Status**: 201 CREATED.

**Exemplo de envio**:

```json
{
  "name": "newUser",
  "email": "newUser@main.com.br",
  "password": "1234",
  "admin": false
}
```

**Exemplo de retorno**:

```json
{
  "id": 5,
  "name": "Fabio",
  "email": "fabio5@kenzie.com.br",
  "admin": false,
  "createdAt": "2023-03-10",
  "updatedAt": "2023-03-10",
  "deletedAt": null
}
```

- Não deve ser possível criar um usuário com um email já existente:
  - **Envio**: Um objeto contendo um email já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "name": "newUser",
  "email": "existingEmail@main.com.br",
  "password": "1234",
  "admin": false
}
```

**Exemplo de retorno**:

```json
{
  "message": "Email already exists."
}
```

### **GET: /users**

- Rota responsável por listar todos os usuários cadastrados.

  **_Regras de negócio_**

- A rota deve retornar todos os dados dos usuários, com exceção da hash de senha.
- A rota pode ser acessada apenas por usuários administradores (admin = true).

- Caso de sucesso:
- **Retorno**: Lista de objetos de usuários.
- **Status**: 200 OK.
- Exemplo de retorno:

```json
[
  {
    "id": 5,
    "name": "exemplo",
    "email": "exemplo@mail.com.br",
    "admin": false,
    "createdAt": "2023-03-10",
    "updatedAt": "2023-03-10",
    "deletedAt": null
  },
  {
    "id": 6,
    "name": "exemplo2",
    "email": "exemplo2@mail.com.br",
    "admin": true,
    "createdAt": "2023-03-10",
    "updatedAt": "2023-03-10",
    "deletedAt": null
  }
  //...
]
```

### **PATCH: /users/&lt;id&gt;**

- Rota responsável por atualizar um usuário pelo id recebido nos parâmetros da rota.

**_Regras de negócio_**

- Deve ser possível atualizar um usuário contendo os seguintes dados:
  - **name**: string.
  - **email**: string.
  - **password**: string.
- Não deve ser possível atualizar os campos id e admin.
- Ao menos uma chave deve ser enviada para atualização.
- Chaves não atualizáveis na rota serão desconsideradas pelo serviço.
- Apenas administradores podem atualizar qualquer usuário.
- Usuários não-administradores podem apenas atualizar seu próprio usuário.

- Caso de sucesso:
- **Envio**: Um objeto contendo os dados do usuário a ser atualizado.
- **Retorno**: Um objeto contendo os dados do usuário atualizado.
- **Status**: 200 OK.

**Exemplo de envio**:

```json
{
  "name": "updatedUser",
  "email": "updatedUser@main.com.br",
  "password": "1234"
}
```

- Não deve ser possível atualizar um usuário caso ele não exista:
  - **Envio**: Um objeto contendo os dados do usuário.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de envio**:

```json
{
  "email": "updatedUser@main.com.br"
}
```

**Exemplo de retorno**:

```json
{
  "message": "User not found"
}
```

- Não deve ser possível atualizar um usuário com um email já existente:
  - **Envio**: Um objeto contendo um email já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "name": "exemplo 1: PATCH"
}
```

**Exemplo de retorno**:

```json
{
  "message": "Email already exists"
}
```

### **DELETE: /users/&lt;id&gt;**

**_Regras de negócio_**

- Deve ser possível realizar um soft delete um usuário pelo id recebido nos parâmetros da rota.

- Caso de sucesso:
- **Envio**: Sem envio.
- **Retorno**: Sem retorno.
- **Status**: 204 NO CONTENT.

- Não deve ser possível deletar um usuário caso ele não exista:
  - **Envio**: Sem envio.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "User not found"
}
```

### **POST: /login**

- Rota de login recebendo email e password.

  **_Regras de negócio_**

- O login deve validar se o usuário existe e validar se a senha está correta.
- Não deve ser possível realizar o login de um usuário deletado.

- Caso de sucesso:
- **Envio**: Um objeto contendo email e password.
- **Retorno**: Um objeto contendo um token jwt válido.
- **Status**: 200 OK.

**Exemplo de envio**:

```json
{
  "email": "user@mail.com.br",
  "password": "12345"
}
```

**Exemplo de retorno**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

- Não deve ser possível realizar login e gerar o token em caso e email ou password incorretos:
- **Envio**: Um objeto contendo email ou um password.
- **Retorno**: Um objeto contendo uma mensagem de erro.
- **Status**: 401 UNAUTHORIZED.

**Exemplo de envio**:

```json
{
  "email": "userr@mail.com.br",
  "password": "123456"
}
```

**Exemplo de retorno**:

```json
{
  "token": "Invalid credentials"
}
```

### **POST: /categories**

- Rota responsável pela criação de uma nova categoria de imóvel.

**_Regras de negócio_**

- Deve ser possível criar uma categoria contendo os seguintes dados:

  - **name**: string.

- Não podem ser cadastrados duas categoria com o mesmo nome.
- Chaves não requeridas na rota serão desconsideradas pelo serviço.
- A rota pode ser acessada apenas por usuários administradores (admin = true).

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados da categoria a ser criada.
  - **Retorno**: Um objeto contendo os dados da categoria.
  - **Status**: 201 CREATED.

**Exemplo de envio**:

```json
{
  "name": "Apartamento"
}
```

**Exemplo de retorno**:

```json
{
  "id": 5,
  "name": "Apartamento"
}
```

- Não deve ser possível criar uma categoria com um nome já existente:
  - **Envio**: Um objeto contendo uma categoria já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "name": "Apartamento"
}
```

**Exemplo de retorno**:

```json
{
  "message": "Category already exists"
}
```

### **GET: /categories**

- Rota responsável por listar todas as categorias cadastradas.

**_Regras de negócio_**

- Rota deve listar todas as categorias.
- A rota não precisa de autenticação para ser acessada.

- Caso de sucesso:
- **Retorno**: Lista de objetos de categorias.
- **Status**: 200 OK.
- Exemplo de retorno:

```json
[
  {
    "id": 1,
    "name": "Apartamento"
  },
  {
    "id": 2,
    "name": "Flat"
  }
  //...
]
```

### **GET: /categories/&lt;id&gt;/realEstate**

- Rota responsável por listar todos os imóveis pertinentes a uma determinada categoria.

**_Regras de negócio_**

- Deve ser possível listar todos os imóveis pertinentes ao id da categoria recebido nos parâmetros da rota.
- A rota não precisa de autenticação para ser acessada.

- Caso de sucesso:
- **Retorno**: Lista de objetos de imóveis.
- **Status**: 200 OK.
- Exemplo de retorno:

```json
{
  "id": 4,
  "name": "Sobrado",
  "realEstate": [
    {
      "id": 1,
      "sold": false,
      "value": "60000.00",
      "size": 30,
      "createdAt": "2023-03-10",
      "updatedAt": "2023-03-10"
    },
    {
      "id": 5,
      "sold": false,
      "value": "65000.00",
      "size": 80,
      "createdAt": "2023-03-10",
      "updatedAt": "2023-03-10"
    }
    //...
  ]
}
```

### **POST: /realEstate**

- Rota responsável pela criação de um novo imóvel.

  **_Regras de negócio_**

- Deve ser possível criar um imóvel contendo os seguintes dados:

  - **value**: decimal.
  - **size**: int.
  - **password**: string.
  - **sold**: boolean.
  - **categoryId**: number.
  - **createdAt**: string.
  - **updatedAt**: string.
  - **address**: object.
    - **street**: string.
    - **zipCode**: string.
    - **number**: string.
    - **city**: string.
    - **state**: string.

- Não podem ser cadastrados dois imóveis com o mesmo endereço.
- A rota pode ser acessada apenas por administradores.
- Não podem ser cadastrados imóveis com o campo state maior que 2 dígitos.
- Não podem ser cadastrados imóveis com com um id de categoria inexistente.
- Chaves não requeridas na rota serão desconsideradas pelo serviço.
- Não podem ser cadastrados imóveis com o campo zipCode maior que 8 dígitos.
- A chave sold não deve ser passada no momento da criação e tem como padrão o valor false.
- As chaves createdAt e updatedAt são geradas automaticamente pelo serviço.

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do imóvel a ser criado.
  - **Retorno**: Um objeto contendo os dados do imóvel, endereço e categoria.
  - **Status**: 201 CREATED.

**Exemplo de envio**:

```json
{
  "value": 200,
  "size": 50,
  "address": {
    "street": "Rua X",
    "zipCode": "30834554",
    "number": "30",
    "city": "São Paulo",
    "state": "SP"
  },
  "categoryId": 1
}
```

**Exemplo de retorno**:

```json
{
  "id": 13,
  "sold": false,
  "value": "200.00",
  "size": 50,
  "createdAt": "2023-03-12",
  "updatedAt": "2023-03-12",
  "address": {
    "id": 21,
    "street": "Rua X",
    "zipCode": "30834554",
    "number": "30",
    "city": "São Paulo",
    "state": "SP"
  },
  "category": {
    "id": 1,
    "name": "Sobrado"
  }
}
```

- Não deve ser possível criar um imóvel com um endereço já existente:
  - **Envio**: Um objeto contendo um endereço já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "value": 200,
  "size": 50,
  "address": {
    "street": "Rua X",
    "zipCode": "30834554",
    "number": "30",
    "city": "São Paulo",
    "state": "SP"
  },
  "categoryId": 1
}
```

**Exemplo de retorno**:

```json
{
  "message": "Address already exists"
}
```

- Não deve ser possível criar um imóvel com uma categoria inexistente:
  - **Envio**: Um objeto contendo um id de categoria inexistente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de envio**:

```json
{
  "value": 200,
  "size": 50,
  "address": {
    "street": "Rua X",
    "zipCode": "30834554",
    "number": "30",
    "city": "São Paulo",
    "state": "SP"
  },
  "categoryId": 9999999999999
}
```

**Exemplo de retorno**:

```json
{
  "message": "Category not found"
}
```

- Não deve ser possível criar um imóvel com o campo state maior que 2 dígitos:
  - **Envio**: Um objeto contendo mais do que 2 digitos no campo state.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 400 BAD REQUEST.

**Exemplo de envio**:

```json
{
  "value": 200,
  "size": 50,
  "address": {
    "street": "Rua X",
    "zipCode": "30834554",
    "number": "30",
    "city": "São Paulo",
    "state": "SSP"
  },
  "categoryId": 9
}
```

**Exemplo de retorno**:

```json
{
  "message": {
    "address": ["String must contain at most 2 character(s)"]
  }
}
```

- Não deve ser possível criar um imóvel com o campo zipCode maior que 8 dígitos:
- **Envio**: Um objeto contendo mais do que 8 digitos no campo zipCode.
- **Retorno**: Um objeto contendo uma mensagem de erro.
- **Status**: 400 BAD REQUEST.

**Exemplo de envio**:

```json
{
  "value": 200,
  "size": 50,
  "address": {
    "street": "Rua X",
    "zipCode": "3083654654654554",
    "number": "30",
    "city": "São Paulo",
    "state": "SP"
  },
  "categoryId": 9
}
```

**Exemplo de retorno**:

```json
{
  "message": {
    "address": ["String must contain at most 8 character(s)"]
  }
}
```

### **GET: /realEstate**

- Rota responsável por listar todos os imóveis cadastrados.

**_Regras de negócio_**

- Rota deve listar todos os imóveis.
- A rota não precisa de autenticação para ser acessada.

- Caso de sucesso:
- **Retorno**: Lista de objetos de imóveis.
- **Status**: 200 OK.
- Exemplo de retorno:

```json
[
  {
    "id": 5,
    "sold": false,
    "value": "200.00",
    "size": 50,
    "createdAt": "2023-03-12",
    "updatedAt": "2023-03-12",
    "address": {
      "id": 13,
      "street": "Rua X",
      "zipCode": "3000",
      "number": "30",
      "city": "São Paulo",
      "state": "SP"
    }
  },
  {
    "id": 6,
    "sold": false,
    "value": "200.00",
    "size": 50,
    "createdAt": "2023-03-12",
    "updatedAt": "2023-03-12",
    "address": {
      "id": 14,
      "street": "Rua X",
      "zipCode": "30000",
      "number": "30",
      "city": "São Paulo",
      "state": "SP"
    }
  }
  //...
]
```

### **POST: /schedules**

- Rota responsável pelo agendamento de uma visita a um imóvel.

  **_Regras de negócio_**

- Deve ser possível agendar uma visita a um imóvel fornecendo os seguintes dados:

  - **date**: string.
  - **hour**: string.
  - **realEstateId**: int.

- A rota exige autenticação para ser acessada.
- O userId não deve ser passado no body da requisição e sim pego através do token do usuário.
- Um imóvel não pode pussuir mais de um agendamento na mesma data e hora.
- O usuário não poderá possuir agendamentos diferentes em uma mesma data e hora.
- Só deve ser possível agendar uma visita durante horário comercial (08:00 as 18:00).
- Só deve ser possível agendar uma visita durante em dias úteis (segunda à sexta).
- Não deve ser possível criar um agendamento para um realEstateId inexistente.

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do agendamento a ser criado.
  - **Retorno**: Um objeto contendo uma mensagem de sucesso.
  - **Status**: 201 CREATED.

**Exemplo de envio**:

```json
{
  "date": "2023/03/21",
  "hour": "14:00",
  "realEstateId": 11
}
```

**Exemplo de retorno**:

```json
{
  "message": "Schedule created"
}
```

- Não deve ser possível criar um agendamento para um realEstateId inexistente:
  - **Envio**: Um objeto contendo um id de endereço inexistente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de envio**:

```json
{
  "date": "2023/03/21",
  "hour": "14:00",
  "realEstateId": 1112323546
}
```

**Exemplo de retorno**:

```json
{
  "message": "RealEstate not found"
}
```

- Um imóvel não pode pussuir mais de um agendamento na mesma data e hora:
  - **Envio**: Um objeto contendo o id de um endereço que já possui agendamento na data e hora fornecidas.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "date": "2023/03/21",
  "hour": "14:00",
  "realEstateId": 1
}
```

**Exemplo de retorno**:

```json
{
  "message": "Schedule to this real estate at this date and time already exists"
}
```

- O usuário não poderá possuir agendamentos diferentes em uma mesma data e hora:
  - **Envio**: Um objeto contendo data e hora já utilizadas pelo usuário em outro agendamento.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "date": "2023/03/21",
  "hour": "14:00",
  "realEstateId": 2
}
```

**Exemplo de retorno**:

```json
{
  "message": "User schedule to this real estate at this date and time already exists"
}
```

- Não deve ser possível agendar uma visita fora horário comercial (08:00 as 18:00):
- **Envio**: Um objeto contendo o campo "hour" fora do range disponível para agendamento.
- **Retorno**: Um objeto contendo uma mensagem de erro.
- **Status**: 400 BAD REQUEST.

**Exemplo de envio**:

```json
{
  "date": "2023/03/21",
  "hour": "19:00",
  "realEstateId": 12
}
```

**Exemplo de retorno**:

```json
{
  "message": "Invalid hour, available times are 8AM to 18PM"
}
```

- Não deve ser possível agendar uma visita aos finais de semana:
- **Envio**: Um objeto contendo o campo "date" contendo uma data fora dos dias úteis.
- **Retorno**: Um objeto contendo uma mensagem de erro.
- **Status**: 400 BAD REQUEST.

**Exemplo de envio**:

```json
{
  "date": "2023/03/26",
  "hour": "15:00",
  "realEstateId": 12
}
```

**Exemplo de retorno**:

```json
{
  "message": "Invalid date, work days are monday to friday"
}
```

### **GET: /schedules/realEstate/&lt;id&gt;**

- Rota responsável por listar todos agendamentos pertencentes a um determinado imóvel.

**_Regras de negócio_**

- A rota deve retornar todos os agendamentos realizados para um imóvel cujo id deve ser
  recebido atavés dos parâmetros de rota.
- A rota pode ser acessada apenas por usuários administradores (admin = true).
- Não deve ser possível retornar dados para um realEstateId inexistente.
- O retorno da rota pesquisa deve ser constituído por um objeto contendo o imóvel junto com seu endereço
  e categorias completos. Deve retornar a chave "schedules" possuindo uma lista de agendamentos, trazendo todos
  os dados do mesmo, incluindo todos os dados do usuário que o efetuou. Importante ressaltar que devido às regras
  de negócio propostas, também é retornado o campo "password" junto com as informações do usuário, contendo o hash
  da senha cadastrada.

- Caso de sucesso:
- **Retorno**: Lista de objetos com todos os agendamentos pertencentes a um imóvel.
- **Status**: 200 OK.
- Exemplo de retorno:

```json
{
  "id": 11,
  "sold": false,
  "value": "200.00",
  "size": 50,
  "createdAt": "2023-03-12",
  "updatedAt": "2023-03-12",
  "address": {
    "id": 19,
    "street": "Rua X",
    "zipCode": "30654",
    "number": "30",
    "city": "São Paulo",
    "state": "SP"
  },
  "category": {
    "id": 1,
    "name": "Sobrado"
  },
  "schedules": [
    {
      "id": 5,
      "date": "2023-03-21",
      "hour": "18:00:00",
      "user": {
        "id": 1,
        "name": "Fabio",
        "email": "fabio@kenzie.com.br",
        "password": "$2a$10$DpXjoaflcbXB0Yy3DjaWqOPIOcnIs2GyzmCBQj7xx2nlMENAJUK9q",
        "admin": true,
        "createdAt": "2023-03-10",
        "updatedAt": "2023-03-10",
        "deletedAt": null
      }
    },
    {
      "id": 7,
      "date": "2023-03-21",
      "hour": "10:00:00",
      "user": {
        "id": 1,
        "name": "Fabio",
        "email": "fabio@kenzie.com.br",
        "password": "$2a$10$DpXjoaflcbXB0Yy3DjaWqOPIOcnIs2GyzmCBQj7xx2nlMENAJUK9q",
        "admin": true,
        "createdAt": "2023-03-10",
        "updatedAt": "2023-03-10",
        "deletedAt": null
      }
    }
    //...
  ]
}
```

- Não deve ser possível realizar uma consulta para um realEstateId inexistente:
  - **Envio**: Um realEstateId inexistente sendo passado pelos parâmetros de rota .
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "RealEstate not found"
}
```
