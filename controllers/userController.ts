import { Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db';
import { IUser } from '../interfaces/User.interface';
import { AuthRequest } from '../middleware/authMiddleware'; // Importa a request autenticada

// @desc    Registrar um novo usuário
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: AuthRequest, res: Response) => {
  const { name, email, password } = req.body;

  // Validação simples
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Por favor, adicione todos os campos' });
    return; 
  }

  // Verifica se o usuário já existe
  const userExistsSql = `SELECT * FROM users WHERE email = ?`;
  db.get(userExistsSql, [email], async (err: Error | null, row: IUser) => {
    if (err) {
        res.status(500).json({ message: 'Erro ao criar usuário' });
        return;
    }
    if (row) {
      res.status(400).json({ message: 'Usuário já existe' });
      return; // Para o fluxo aqui dentro
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria o usuário
    const insertSql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(insertSql, [name, email, hashedPassword], function (err: Error | null) {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar usuário' });
      }
      res.status(201).json({
        id: this.lastID,
        name,
        email,
      });
    });
  });
};

// @desc    Obter informações do usuário logado
// @route   GET /api/users/me
// @access  Private
export const getMe = (req: AuthRequest, res: Response) => {
    // O usuário é anexado à requisição pelo middleware 'protect'
    res.status(200).json(req.user);
};