import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import { IUser } from '../interfaces/User.interface';

// Função para gerar o token JWT
const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// @desc    Autenticar (fazer login) um usuário
// @route   POST /api/auth/login
// @access  Public
export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], async (err: Error | null, user: IUser) => {
    if (err) {
      res.status(500).json({ message: 'Erro no servidor' });
      return ;
    }
    if (!user) {
      res.status(400).json({ message: 'Credenciais inválidas' });
      return;
    }

    // Compara a senha enviada com a senha hasheada no banco
    const isMatch = await bcrypt.compare(password, user.password as string);

    if (isMatch) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id), // Gera e envia o token
      });
    } else {
      res.status(400).json({ message: 'Credenciais inválidas' });
    }
  });
};