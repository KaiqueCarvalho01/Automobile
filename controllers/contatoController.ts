import { Request, Response } from 'express';
import db from '../config/db';

export const submitContato = (req: Request, res: Response) => {

  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email || !telefone || !mensagem) {
    return res.render('contato', {
      mensagemErro: 'Todos os campos são obrigatórios.'
    });
  }

  const sql = `INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)`;

  db.run(sql, [nome, email, telefone, mensagem], function (err) {
    if (err) {
      console.error(err.message);
      return res.render('contato', {
        mensagemErro: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.'
      });
    }
    
    // Renderiza a página novamente com uma mensagem de sucesso
    res.render('contato', {
      mensagemSucesso: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    });
  });
};
