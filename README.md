# Stream csv 🚀️

Desafio com o objetivo reforçar de forma prática os **conceitos de node**.

Nesse desafio foi criado uma API para realizar um CRUD de *tasks* (tarefas).

A API teve como regra as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV

### Estrutura da TASK

Estrutura (propriedades) que uma task deve ter:

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

Rotas:

- `POST - /tasks`
    
    É possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
    
    Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente.
    
- `GET - /tasks`
    
    Lista todas as tasks salvas no banco de dados.
    
    Também é possível realizar uma busca, filtrando as tasks pelo `title` e `description`
    
- `PUT - /tasks/:id`
    
    É possível atualizar uma task pelo `id`.
    
    No `body` da requisição, recebe somente o `title` e/ou `description` para serem atualizados.
    
- `DELETE - /tasks/:id`
    
    É possível remover uma task pelo `id`.
    
- `PATCH - /tasks/:id/complete`
    
    É possível marcar a task como completa ou não. Isso significa que se a task estiver concluída,  volta ao seu estado “normal”.
    

### Importação CSV

Ao rodar o comando `node src/Utils/import-csv.js`  é possível processar em stream um arquivo  csv para cada linha, realizando uma requisição para a rota `POST - /tasks`, passando os campos necessários do endpoint.

### Como executar

```tsx
# Versão Node
18.14.1 LTS https://nodejs.org/en/

# Intalar dependência
yarn

# Executar comando
yarn dev
```