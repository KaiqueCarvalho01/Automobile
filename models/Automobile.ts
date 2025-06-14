import db from '../config/db';

const createAutomobileTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS automobiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id)
  )`;

  //callback de erro aqui
  db.run(sql, (err) => {
    if (err) {
      console.error("ERRO AO CRIAR TABELA 'automobiles':", err.message);
    }
  });
};

export default createAutomobileTable;