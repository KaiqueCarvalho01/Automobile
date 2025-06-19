import db from '../config/db';

const createContatoTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT NOT NULL, 
      mensagem TEXT NOT NULL,
      data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error("ERRO AO CRIAR TABELA 'contatos':", err.message);
    }
  });
};

export default createContatoTable;
