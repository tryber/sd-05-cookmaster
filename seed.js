// colocar query do MongoDB
// Crie um arquivo seed.js na raiz do projeto com uma query do Mongo DB capaz de inserir um usuário na coleção users com os
// seguintes valores:
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
