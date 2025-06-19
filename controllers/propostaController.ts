import { Request, Response } from 'express';
import db from '../config/db';

export const submitProposta = (req: Request, res: Response) => {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email) {
    // CORREÇÃO: Renderiza a página novamente com uma mensagem de erro
    res.render('proposta', {
      errorMessage: 'Nome e e-mail são obrigatórios.'
    });
    return;
  }

  const sql = `INSERT INTO propostas (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)`;

  db.run(sql, [nome, email, telefone, mensagem], function (err) {
    if (err) {
      console.error(err.message);
      // CORREÇÃO: Renderiza a página novamente com uma mensagem de erro
      res.render('proposta', {
        errorMessage: 'Ocorreu um erro ao enviar sua proposta. Tente novamente.'
      });
      return;
    }
    
    // CORREÇÃO: Renderiza a página novamente com uma mensagem de sucesso
    res.render('proposta', {
      successMessage: 'Proposta enviada com sucesso! Entraremos em contato em breve.'
    });
  });
};
