import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import { IUser } from '../interfaces/User.interface';

// Estendendo a interface Request do Express para incluir nossa propriedade 'user'
export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Verifica se o token está no cabeçalho e começa com "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pega o token do cabeçalho (removendo o "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

      // Pega o usuário do banco de dados pelo id do token e o anexa ao objeto de requisição (req)
      const sql = `SELECT id, name, email FROM users WHERE id = ?`;
      db.get(sql, [decoded.id], (err: Error | null, user: IUser) => {
        if (err || !user) {
          return res.status(401).json({ message: 'Não autorizado, falha na busca do usuário' });
        }
        
        req.user = user; // Anexa o usuário à requisição
        next(); // Passa para o próximo middleware/controller
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};