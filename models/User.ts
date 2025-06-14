import db from '../config/db';

const createUserTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`;

  // Adicionamos o callback de erro aqui
  db.run(sql, (err) => {
    if (err) {
      console.error("ERRO AO CRIAR TABELA 'users':", err.message);
    }
  });
};

export default createUserTable;