# API - Project Manager

- [Users](#users)

## Users

### Campos

| Campo           | Tipo                                 |
| --------------- | ------------------------------------ |
| **id**          | uuid(auto)                           |
| **name**        | string(required)                     |
| **email**       | string(required)                     |
| **password**    | string(required)                     |
| **image_url**   | link                                 |
| **create_at**   | DateTime(auto)                       |
| **update_at**   | DateTime(auto)                       |

### Endpoints

| Função               | Método | Endpoint                                |
| -------------------- | ------ | --------------------------------------- |
| **list**             | GET    | `/users`                                |
| **create**           | POST   | `/users`                                |
| **delete**           | DELETE | `/users/{user_id}`                      |
