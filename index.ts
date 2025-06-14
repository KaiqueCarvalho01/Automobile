import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db';
import createUserTable from './models/User';
import createAutomobileTable from './models/Automobile';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import automobileRoutes from './routes/automobileRoutes';

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/automobiles', automobileRoutes);

// Garante que as tabelas sejam criadas na inicialização
db.serialize(() => {
  createUserTable();
  createAutomobileTable();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});