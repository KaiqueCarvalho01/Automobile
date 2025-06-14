import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';

import db from './config/db';
import createUserTable from './models/User';
import createAutomobileTable from './models/Automobile';
import createContatoTable from './models/Contato';
import createPropostaTable from './models/Proposta';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import automobileRoutes from './routes/automobileRoutes';
import propostaRoutes from './routes/propostaRoutes';
import contatoRoutes from './routes/contatoRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SQLiteStore = connectSqlite3(session);
app.use(session({
  store: new SQLiteStore({
    db: 'sessions.sqlite',
    dir: './config',
    table: 'sessions'
  }) as session.Store,
  secret: 'sua-chave-secreta-muito-forte',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// --- MIDDLEWARE DE DIAGNÓSTICO ---
// Este middleware irá rodar em TODAS as requisições
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`\n--- [DEBUG] Nova Requisição: ${req.method} ${req.path} ---`);
  // Verifica se a sessão e o utilizador existem antes de os registar
  if ((req as any).session && (req as any).session.user) {
    console.log('[DEBUG] Dados encontrados na sessão (req.session.user):', (req as any).session.user);
  } else {
    console.log('[DEBUG] Nenhum utilizador encontrado na sessão.');
  }
  
  res.locals.currentUser = (req as any).session.user || null;
  console.log('[DEBUG] res.locals.currentUser foi definido como:', res.locals.currentUser);
  console.log('----------------------------------------------------');
  next();
});

// --- ROTAS DO SITE ---
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/estoques', (req, res) => res.render('estoques'));
app.get('/register', (req, res) => res.render('register'));
app.use('/contato', contatoRoutes);
app.use('/proposta', propostaRoutes);

// --- ROTAS DA API ---
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/automobiles', automobileRoutes);

// Inicialização do banco de dados
db.serialize(() => {
  createUserTable();
  createAutomobileTable();
  createContatoTable();
  createPropostaTable();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Híbrido rodando na porta ${PORT}`);
  console.log(`Acesse o site em: http://localhost:${PORT}`);
});
