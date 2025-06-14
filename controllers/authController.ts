import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db';
import { IUser } from '../interfaces/User.interface';

// @desc    Autenticar (fazer login) um usuário
// @route   POST /api/auth/login
export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], async (err: Error | null, user: IUser) => {
    if (err) {
      // CORREÇÃO: Renderiza a página de login com a mensagem de erro correta
      return res.render('login', { mensagemErro: 'Erro no servidor. Tente novamente.' });
    }
    if (!user) {
      return res.render('login', { mensagemErro: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (isMatch) {
      const userSessionData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      // Guarda os dados do usuário na sessão
      (req as any).session.user = userSessionData;
      
      // SUCESSO: Redireciona para a página inicial
      return res.redirect('/');
    } else {
      return res.render('login', { mensagemErro: 'Credenciais inválidas.' });
    }
  });
};

// @desc    Fazer logout do usuário
// @route   GET /api/auth/logout
export const logoutUser = (req: Request, res: Response) => {
  // Destrói a sessão do usuário
  (req as any).session.destroy((err: Error) => {
    if (err) {
      console.log("Erro ao fazer logout:", err);
      // Mesmo com erro, tentamos renderizar a página de login com uma mensagem de erro
      return res.render('login', { mensagemErro: 'Ocorreu um erro ao sair.' });
    }
    
    // CORREÇÃO: Renderiza a página de login com uma mensagem de sucesso
    res.clearCookie('connect.sid');
    res.render('login', { mensagemSucesso: 'Você saiu da sua conta com sucesso.' });
  });
};
