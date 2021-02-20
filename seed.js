// Requisito 6 - Permissões do usuário admin
// colocar query do MongoDB
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
