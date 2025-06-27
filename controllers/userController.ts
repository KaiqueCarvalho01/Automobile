import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db';
import { IUser } from '../interfaces/User.interface';
import { AuthRequest } from '../middleware/authMiddleware';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, cpf, telefone, password, confirmPassword } = req.body;

  // --- VALIDAÇÕES OBRIGATÓRIAS ---
  if (!name || !email || !password || !confirmPassword) {
    return res.render('register', { mensagemErro: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  if (password !== confirmPassword) {
    return res.render('register', { mensagemErro: 'As senhas não coincidem.' });
  }

  // --- VALIDAÇÃO DO FORMATO DO E-MAIL ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.render('register', { mensagemErro: 'Formato de e-mail inválido.' });
  }
  
  // --- VALIDAÇÕES OPCIONAIS (SÓ VALIDAM SE O CAMPO FOR PREENCHIDO) ---

  // Valida o CPF se ele não estiver vazio
  if (cpf && cpf.trim() !== '') {
    // Regex simples que aceita 11 dígitos, com ou sem pontuação.
    const cpfRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;
    if (!cpfRegex.test(cpf)) {
      return res.render('register', { mensagemErro: 'Formato de CPF inválido.' });
    }
  }

  // Valida o Telefone se ele não estiver vazio
  if (telefone && telefone.trim() !== '') {
    const telefoneRegex = /^\d{10,11}$/;
    if (!telefoneRegex.test(telefone)) {
      return res.render('register', { mensagemErro: 'Formato de telefone inválido (apenas números, com DDD).' });
    }
  }


  // --- LÓGICA DO BANCO DE DADOS ---
  const userExistsSql = `SELECT * FROM users WHERE email = ? OR (cpf = ? AND cpf != '')`;
  db.get(userExistsSql, [email, cpf], async (err: Error | null, row: IUser) => {
    if (err) {
      console.error("ERRO NA CONSULTA DE USUÁRIO:", err);
      return res.render('register', { mensagemErro: 'Erro no servidor. Tente novamente.' });
    }
    if (row) {
      return res.render('register', { mensagemErro: 'Este e-mail ou CPF já está em uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertSql = `INSERT INTO users (name, email, cpf, telefone, password) VALUES (?, ?, ?, ?, ?)`;
    db.run(insertSql, [name, email, cpf || null, telefone || null, hashedPassword], function (err: Error | null) {
      if (err) {
        console.error("ERRO AO INSERIR USUÁRIO:", err);
        return res.render('register', { mensagemErro: 'Erro ao criar o usuário.' });
      }
      const session = (req as any).session;
      session.mensagemSucesso = 'Cadastro realizado com sucesso! Por favor, faça o login.';
      session.save(() => {
          res.redirect('/login');
      });
    });
  });
};


export const getMe = (req: AuthRequest, res: Response) => {
    const user = (req as any).user;
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: 'Não autorizado' });
    }
};
