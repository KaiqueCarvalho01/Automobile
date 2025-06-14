import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';

// Nossos modelos
import db from './config/db';
import createUserTable from './models/User';
import createAutomobileTable from './models/Automobile';
import createContatoTable from './models/Contato';
import createPropostaTable from './models/Proposta';

// Nossas rotas
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import automobileRoutes from './routes/automobileRoutes';
import propostaRoutes from './routes/propostaRoutes';
import contatoRoutes from './routes/contatoRoutes';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração inicial do Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configurando o EJS e os arquivos estáticos
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para interpretar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Armazenamento de Sessão
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

// Middleware para expor informações da sessão para as views EJS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.currentUser = (req as any).session.user || null;
  next();
});

// --- ROTAS DO SITE (PÁGINAS RENDERIZADAS) ---
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/estoques', (req, res) => res.render('estoques'));
app.get('/register', (req, res) => res.render('register'));

// Usando as rotas de contato e proposta
app.use('/contato', contatoRoutes);
app.use('/proposta', propostaRoutes);

// --- ROTAS DA API (QUE RETORNAM JSON) ---
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/automobiles', automobileRoutes);

// Garante que TODAS as tabelas sejam criadas na inicialização
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
