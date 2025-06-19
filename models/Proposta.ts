import db from '../config/db';

const createPropostaTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS propostas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT,
      mensagem TEXT,
      data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error("ERRO AO CRIAR TABELA 'propostas':", err.message);
    }
  });
};

export default createPropostaTable;
