// controllers/contatoController.js
import db from '../config/database.js'; // Importa a instância do banco de dados

export const mostrarFormularioContato = (req, res) => {
  try {
    res.render('contato', {});
  } catch (error) {
    console.error("Erro ao renderizar a página de contato:", error);
    res.status(500).render('contato', {
      mensagemErro: "Erro ao carregar a página de contato."
    });
  }
};

export const enviarFormularioContato = async (req, res) => { // Adicionado async
  try {
    const { name, email, telefone, message } = req.body;

    console.log('--- Formulário de Contato Recebido (SQLite) ---');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Telefone:', telefone);
    console.log('Mensagem:', message);

    const sql = `INSERT INTO contatos (name, email, telefone, message) VALUES (?, ?, ?, ?)`;
    const params = [name, email, telefone, message];

    // db.run() é assíncrono. Usamos uma Promise para poder usar await.
    await new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) {
          console.error('Erro ao inserir dados na tabela contatos:', err.message);
          reject(err);
        } else {
          console.log(`Novo contato inserido com ID: ${this.lastID}`);
          resolve(this.lastID);
        }
      });
    });

    res.render('contato', {
      mensagemSucesso: 'Formulário enviado com sucesso! Entraremos em contato em breve.'
    });

  } catch (error) {
    // O erro já foi logado pela Promise ou erro anterior
    res.status(500).render('contato', {
      mensagemErro: 'Ocorreu um erro ao enviar seu formulário. Tente novamente.'
    });
  }
};