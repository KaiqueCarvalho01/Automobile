import { Request, Response } from 'express';
import db from '../config/db';

export const submitProposta = (req: Request, res: Response) => {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email) {
    res.status(400).send("Nome e email são obrigatórios.");
    return;
  }

  const sql = `INSERT INTO propostas (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)`;

  db.run(sql, [nome, email, telefone, mensagem], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erro ao enviar a proposta.");
      return;
    }
    res.redirect('/');
  });
};
