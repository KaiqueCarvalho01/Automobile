import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import compression from 'compression';

// Nossos modelos e rotas...
import db from './config/db';
import createUserTable from './models/User';
import createContatoTable from './models/Contato';
import createPropostaTable from './models/Proposta';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import propostaRoutes from './routes/propostaRoutes';
import contatoRoutes from './routes/contatoRoutes';
import indexRouter from './routes/index';

dotenv.config();
const app = express();
// Lê a porta INTERNA que o servidor deve escutar
const INTERNAL_PORT = process.env.INTERNAL_PORT || 5000;

// Lê a porta PÚBLICA para exibir no link de acesso
// Se não for definida, usa a interna como padrão
const PUBLIC_PORT = process.env.PUBLIC_PORT || INTERNAL_PORT;

app.use(compression());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const umDiaEmMs = 1000 * 60 * 60 * 24;
app.use(express.static(path.join(__dirname, 'public'),{ maxAge: umDiaEmMs }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SQLiteStore = connectSqlite3(session);
app.use(session({
  store: new SQLiteStore({
    db: 'sessions.sqlite',
    dir: './config',
    table: 'sessions'
  }) as session.Store,
  secret: 'chave-ultra-secreta',
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

// Inicialização do banco
db.serialize(() => {
  createUserTable();
  createContatoTable();
  createPropostaTable();
});

// Inicia o servidor
app.listen(Number(INTERNAL_PORT), () => {
  // O log do servidor ainda informa a porta interna real que ele está usando
  console.log(`✅ Servidor Híbrido rodando na porta ${INTERNAL_PORT}`);
  
  // O log para o usuário agora mostra a porta pública correta
  console.log(`Acesse o site em: http://localhost:${PUBLIC_PORT}`);
});