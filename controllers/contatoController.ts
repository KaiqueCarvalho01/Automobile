import { Request, Response } from 'express';
import db from '../config/db';

export const submitContato = (req: Request, res: Response) => {
  const { nome, email, telefone, mensagem } = req.body;

  // --- VALIDAÇÃO DE CAMPOS VAZIOS ---
  if (!nome || !email || !telefone || !mensagem) {
    return res.render('contato', {
      mensagemErro: 'Todos os campos são obrigatórios.'
    });
  }

  // --- NOVA VALIDAÇÃO PARA O FORMATO DO E-MAIL ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.render('contato', {
      mensagemErro: 'Formato de e-mail inválido. Por favor, verifique o e-mail digitado.'
    });
  }

  // --- VALIDAÇÃO PARA O FORMATO DO TELEFONE ---
  const telefoneRegex = /^\d{10,11}$/;
  if (!telefoneRegex.test(telefone)) {
    return res.render('contato', {
      mensagemErro: 'Formato de telefone inválido. Por favor, digite apenas os números, incluindo o DDD (ex: 19987654321).'
    });
  }

  // Se todas as validações passarem, o código continua para salvar no banco
  const sql = `INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)`;

  db.run(sql, [nome, email, telefone, mensagem], function (err) {
    if (err) {
      console.error(err.message);
      return res.render('contato', {
        mensagemErro: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.'
      });
    }
    
    res.render('contato', {
      mensagemSucesso: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    });
  });
};
