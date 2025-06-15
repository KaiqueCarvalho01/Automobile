import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';

// Nossos modelos e rotas...
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
import indexRouter from './routes/index';

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


// Expõe o usuário e as mensagens flash para as views
app.use((req: Request, res: Response, next: NextFunction) => {
  const session = (req as any).session;

  // Passa o usuário logado
  res.locals.currentUser = session.user || null;

  // Passa e depois limpa a mensagem de sucesso
  if (session.mensagemSucesso) {
    res.locals.mensagemSucesso = session.mensagemSucesso;
    delete session.mensagemSucesso;
  }

  // Passa e depois limpa a mensagem de erro
  if (session.mensagemErro) {
    res.locals.mensagemErro = session.mensagemErro;
    delete session.mensagemErro;
  }

  next();
});

// --- ROTAS DO SITE ---
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.use('/contato', contatoRoutes);
app.use('/proposta', propostaRoutes);
app.use('/', indexRouter); 

// --- ROTAS DA API ---
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/automobiles', automobileRoutes);

// Inicialização do banco
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
