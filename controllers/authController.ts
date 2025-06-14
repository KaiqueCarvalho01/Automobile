import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db';
import { IUser } from '../interfaces/User.interface';

// @desc    Autenticar (fazer login) um usuário
export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], async (err: Error | null, user: IUser) => {
    if (err) {
      return res.render('login', { mensagemErro: 'Erro no servidor. Tente novamente.' });
    }
    if (!user) {
      return res.render('login', { mensagemErro: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (isMatch) {
      const session = (req as any).session;
      
      const userSessionData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      session.user = userSessionData;

      session.save((err: any) => {
        if (err) {
          console.error('ERRO AO SALVAR A SESSÃO:', err);
          return res.render('login', { mensagemErro: 'Ocorreu um erro ao iniciar a sessão.' });
        }
        
        // ADICIONADO: Log de diagnóstico para confirmar os dados antes de redirecionar
        console.log('[DEBUG] Sessão salva com sucesso. Redirecionando. Dados na sessão:', session.user);
        
        res.redirect('/');
      });

    } else {
      return res.render('login', { mensagemErro: 'Credenciais inválidas.' });
    }
  });
};

// @desc    Fazer logout do usuário
export const logoutUser = (req: Request, res: Response) => {
  const session = (req as any).session;
  session.destroy((err: Error) => {
    if (err) {
      console.log("Erro ao fazer logout:", err);
      return res.render('login', { mensagemErro: 'Ocorreu um erro ao sair.' });
    }
    
    res.clearCookie('connect.sid');
    res.render('login', { mensagemSucesso: 'Você saiu da sua conta com sucesso.' });
  });
};
