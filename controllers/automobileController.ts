import { Response } from 'express';
import db from '../config/db';
import { IAutomobile } from '../interfaces/Automobile.interface';
import { AuthRequest } from '../middleware/authMiddleware'; // Importa a request autenticada

// @desc    Listar todos os automóveis do usuário logado
// @route   GET /api/automobiles
// @access  Private
export const getAutomobiles = (req: AuthRequest, res: Response) => {
  const sql = `SELECT * FROM automobiles WHERE user_id = ?`;
  db.all(sql, [req.user!.id], (err: Error | null, rows: IAutomobile[]) => {
    if (err) {
        res.status(500).json({ message: 'Erro no servidor' });
      return;
    }
    res.status(200).json(rows);
  });
};

// @desc    Criar um novo automóvel
// @route   POST /api/automobiles
// @access  Private
export const setAutomobile = (req: AuthRequest, res: Response) => {
  const { brand, model, year } = req.body;

  if (!brand || !model || !year) {
    res.status(400).json({ message: 'Por favor, adicione todos os campos' });
       return ;
  }
  
  const sql = `INSERT INTO automobiles (brand, model, year, user_id) VALUES (?, ?, ?, ?)`;
  db.run(sql, [brand, model, year, req.user!.id], function (err: Error | null) {
    if (err) {
        res.status(500).json({ message: 'Erro ao criar automóvel' });
      return;
    }
    res.status(201).json({
      id: this.lastID,
      brand,
      model,
      year,
      user_id: req.user!.id
    });
  });
};

// @desc    Atualizar um automóvel
// @route   PUT /api/automobiles/:id
// @access  Private
export const updateAutomobile = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { brand, model, year } = req.body;

  const findSql = `SELECT * FROM automobiles WHERE id = ?`;
  db.get(findSql, [id], (err: Error | null, automobile: IAutomobile) => {
    if (err) {
        res.status(500).json({ message: 'Erro no servidor' });
      return ;
    }
    if (!automobile) {
         res.status(404).json({ message: 'Automóvel não encontrado' });
      return;
    }
    // Garante que o usuário logado é o dono do automóvel
    if (automobile.user_id !== req.user!.id) {
        res.status(401).json({ message: 'Usuário não autorizado' });
      return ;
    }

    const updateSql = `UPDATE automobiles SET brand = ?, model = ?, year = ? WHERE id = ?`;
    db.run(updateSql, [brand, model, year, id], function (err: Error | null) {
      if (err) {
        res.status(500).json({ message: 'Erro ao atualizar automóvel' });
        return;
      }
      res.status(200).json({ id: Number(id), brand, model, year, user_id: req.user!.id });
    });
  });
};

// @desc    Deletar um automóvel
// @route   DELETE /api/automobiles/:id
// @access  Private
export const deleteAutomobile = (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const findSql = `SELECT * FROM automobiles WHERE id = ?`;
  db.get(findSql, [id], (err: Error | null, automobile: IAutomobile) => {
    if (err) {
        res.status(500).json({ message: 'Erro no servidor' });
      return;
    }
    if (!automobile) {
         res.status(404).json({ message: 'Automóvel não encontrado' });
      return;
    }
    // Garante que o usuário logado é o dono do automóvel
    if (automobile.user_id !== req.user!.id) {
        res.status(401).json({ message: 'Usuário não autorizado' });
      return ;
    }

    const deleteSql = `DELETE FROM automobiles WHERE id = ?`;
    db.run(deleteSql, [id], function (err: Error | null) {
      if (err) {
        res.status(500).json({ message: 'Erro ao deletar automóvel' });
        return;
      }
      res.status(200).json({ id: Number(id) });
    });
  });
};