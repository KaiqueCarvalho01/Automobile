// controllers/propostaController.js
import db from '../config/database.js'; // Importa a instância do banco de dados

export const mostrarFormularioProposta = (req, res) => {
  try {
    res.render('proposta', {});
  } catch (error) {
    console.error("Erro ao renderizar proposta:", error);
    res.status(500).render('proposta', {
        mensagemErro: "Erro ao carregar a página de proposta."
    });
  }
};

export const enviarProposta = async (req, res) => { // Adicionado async
  console.log('--- Iniciando enviarProposta ---');
  console.log('req.body recebido para proposta:', req.body); //
  try {
    const { name, email, telefone, cpf, message } = req.body; //campos da proposta
    console.log('--- Formulário de Proposta Recebido (SQLite) ---');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Telefone:', telefone);
    console.log('CPF:', cpf);
    console.log('Mensagem:', message);
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !telefone || !cpf || !message) {
      console.error('Todos os campos são obrigatórios.');
      return res.status(400).render('proposta', {
        mensagemErro: 'Todos os campos são obrigatórios.',
        name: name, // Passa o valor de volta
        email: email,
        telefone: telefone,
        cpf: cpf,
        message: message
      });
    }
    
    // Verifica se o CPF é válido (opcional, mas recomendado)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato: 123.456.789-01
    if (!cpfRegex.test(cpf)) {
      console.error('CPF inválido. Deve estar no formato 123.456.789-01.');
      return res.status(400).render('proposta', {
        mensagemErro: 'CPF inválido. Deve estar no formato 123.456.789-01.',
        name: name,
        email: email,
        telefone: telefone,
        cpf: cpf, // Passa o CPF (talvez inválido, mas o usuário pode ver e corrigir)
        message: message
      });
    }
    // Prepara a consulta SQL para inserir os dados na tabela propostas
    console.log('Preparando consulta SQL para inserir proposta...');
    // Usamos placeholders (?) para evitar SQL Injection

    const sql = `INSERT INTO propostas (name, email, telefone, cpf, message) VALUES (?, ?, ?, ?, ?)`;
    const params = [name, email, telefone, cpf, message];

    await new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) {
          console.error('Erro ao inserir dados na tabela propostas:', err.message);
          reject(err);
        } else {
          console.log(`Nova proposta inserida com ID: ${this.lastID}`);
          resolve(this.lastID);
        }
      });
    });

    res.render('proposta', {
      mensagemSucesso: 'Proposta enviada com sucesso!'
    });

  } catch (error) {
    // Em caso de outros erros, repassar os dados
    const { name, email, telefone, cpf, message } = req.body; // Pega os dados novamente se o erro for depois da desestruturação
    res.status(500).render('proposta', {
      mensagemErro: 'Erro ao enviar sua proposta.',
      name: name,
      email: email,
      telefone: telefone,
      cpf: cpf,
      message: message
    });
  }
};