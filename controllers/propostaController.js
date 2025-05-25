// controllers/propostaController.js

// Função para mostrar o formulário de proposta
export const mostrarFormularioProposta = (req, res) => {
  try {
    res.render('proposta'); 
  } catch (error) {
    console.error("Erro ao renderizar proposta:", error);
    // Adicione um tratamento de erro
    res.status(500).send("Erro ao carregar a página de proposta.");
  }
};

// Função para processar o envio do formulário de proposta
export const enviarProposta = (req, res) => {
  try {
    const dadosDaProposta = req.body;
    // salvar no banco de dados, validar dados
    console.log('Dados da proposta:', dadosDaProposta);

    
    res.render('proposta', {
      mensagemSucesso: 'Proposta enviada com sucesso!'
    });
    
    // res.send('Proposta recebida com sucesso!');

  } catch (error) {
    console.error("Erro ao enviar proposta:", error);
    res.status(500).render('proposta', {
        mensagemErro: 'Erro ao enviar sua proposta.'
    });
  }
};

