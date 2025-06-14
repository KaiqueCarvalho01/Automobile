import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db';
import { IUser } from '../interfaces/User.interface';

export const registerUser = async (req: Request, res: Response) => {
  // Capturamos todos os campos do formulário
  const { name, email, cpf, telefone, password, confirmPassword } = req.body;

  // --- VALIDAÇÕES ---
  if (!name || !email || !password || !confirmPassword) {
    return res.render('register', { mensagemErro: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  if (password !== confirmPassword) {
    return res.render('register', { mensagemErro: 'As senhas não coincidem.' });
  }

  // --- LÓGICA DO BANCO ---
  const userExistsSql = `SELECT * FROM users WHERE email = ? OR cpf = ?`;
  db.get(userExistsSql, [email, cpf], async (err: Error | null, row: IUser) => {
    if (err) {
      return res.render('register', { mensagemErro: 'Erro no servidor. Tente novamente.' });
    }
    if (row) {
      return res.render('register', { mensagemErro: 'Este e-mail ou CPF já está em uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertSql = `INSERT INTO users (name, email, cpf, telefone, password) VALUES (?, ?, ?, ?, ?)`;
    db.run(insertSql, [name, email, cpf, telefone, hashedPassword], function (err: Error | null) {
      if (err) {
        return res.render('register', { mensagemErro: 'Erro ao criar o usuário.' });
      }
      // Guarda a mensagem na sessão e só então redireciona
      const session = (req as any).session;
      session.mensagemSucesso = 'Cadastro realizado com sucesso! Por favor, faça o login.';
      session.save(() => {
            res.redirect('/login');
      });
    });
  });
};

// A função getMe permanece a mesma para a API
export const getMe = (req: Request, res: Response) => {
    const user = (req as any).user;
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: 'Não autorizado' });
    }
};
