import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';

// Nossas rotas e modelos
import db from './config/db';
import createUserTable from './models/User';
import createAutomobileTable from './models/Automobile';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import automobileRoutes from './routes/automobileRoutes';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração inicial do Express
const app = express();
const PORT = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para interpretar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Armazenamento de Sessão com SQLite
const SQLiteStore = connectSqlite3(session);

// Configuração das Sessões
app.use(session({
  store: new SQLiteStore({
    db: 'sessions.sqlite', // Nome do arquivo do banco de dados de sessões
    dir: './config',           // Diretório para salvar o banco
    table: 'sessions'
  }) as session.Store, 
  secret: 'chave-secreta-muito-forte', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Duração do cookie 
  }
}));

// Middleware para expor informações da sessão para todas as views EJS
app.use((req, res, next) => {
  // A tipagem de 'req.session' pode não ter 'user', então usamos 'as any'
  res.locals.currentUser = (req as any).session.user || null;
  next();
});

// --- ROTAS DO SITE (PÁGINAS RENDERIZADAS) ---
app.get('/', (req, res) => {
  // Renderiza o arquivo views/index.ejs
  res.render('index');
});

app.get('/login', (req, res) => {
  // Renderiza o arquivo views/login.ejs
  res.render('login');
});

app.get('/estoques', (req, res) => {
  // Renderiza o arquivo views/estoques.ejs
  res.render('estoques');
});

// --- ROTAS DA API (QUE RETORNAM JSON) ---
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/automobiles', automobileRoutes);


// Garante que as tabelas de dados sejam criadas na inicialização
db.serialize(() => {
  createUserTable();
  createAutomobileTable();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Híbrido rodando na porta ${PORT}`);
  console.log(`Acesse o site em: http://localhost:${PORT}`);
});
