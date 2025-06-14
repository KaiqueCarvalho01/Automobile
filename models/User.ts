import db from '../config/db';

const createUserTable = () => {
  // Adicionamos as colunas cpf e telefone
  const sql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE,
    telefone TEXT,
    password TEXT NOT NULL
  )`;

  db.run(sql, (err) => {
    if (err) {
      console.error("ERRO AO CRIAR/ATUALIZAR TABELA 'users':", err.message);
    }
  });
};

export default createUserTable;
