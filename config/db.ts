import sqlite3 from 'sqlite3';
import path from 'path';
import createUserTable from '../models/User';
import createAutomobileTable from '../models/Automobile';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    // Garante que as tabelas sejam criadas na inicialização
    createUserTable();
    createAutomobileTable();
  }
});

export default db;