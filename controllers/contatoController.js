// controllers/contatoController.js

// Função para exibir a página/formulário de contato
export const mostrarFormularioContato = (req, res) => {
  try {
    res.render('contato', {});
  } catch (error) {
    console.error("Erro ao renderizar a página de contato:", error);
    res.status(500).render('contato', {
      mensagemErro: "Erro ao carregar a página de contato. Tente novamente mais tarde."
    });
  }
};

// Função para processar os dados do formulário de contato
export const enviarFormularioContato = (req, res) => {
  try {
    // Os dados do formulário estarão em req.body
    const { name, email, telefone, message } = req.body; 

    console.log('--- Formulário de Contato Recebido (Controller ESM) ---');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Telefone:', telefone);
    console.log('Mensagem:', message);
    console.log('---------------------------------------------------');

    // Aqui faria a lógica real:
    // - Validar os dados
    // - Salvar em um banco de dados 
    // - Enviar um email de notificação para mim
    // - Enviar um email de confirmação para o usuário

    // Após processar os dados com sucesso, renderiza a mesma página com uma mensagem de sucesso:
    res.render('contato', {
      mensagemSucesso: 'Formulário enviado com sucesso! Entraremos em contato em breve.'
    });

  } catch (error) {
    console.error("Erro ao processar o formulário de contato:", error);
    // Em caso de erro, renderiza a mesma página com uma mensagem de erro:
    res.status(500).render('contato', {
      mensagemErro: 'Ocorreu um erro ao enviar seu formulário. Tente novamente.'
    });
  }
};