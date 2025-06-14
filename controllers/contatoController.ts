import { Request, Response } from 'express';
import db from '../config/db';

export const submitContato = (req: Request, res: Response) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    res.status(400).send("Todos os campos são obrigatórios.");
    return;
  }

  const sql = `INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)`;

  db.run(sql, [nome, email, mensagem], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erro ao salvar a mensagem de contato.");
      return;
    }
    // Após o sucesso, redireciona o usuário para a página inicial 
    res.redirect('/');
  });
};
