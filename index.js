import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs"); // Configura o EJS como template engine
app.use(express.static("public")); // Serve arquivos estáticos da pasta public

// Rotas
app.get("/", (req, res) => {
  res.render("index"); // Renderiza index.ejs
});

app.get("/login", (req, res) => {
  res.render("login"); // Renderiza login.ejs
});

app.get("/contato", (req, res) => {
  res.render("contato"); // Renderiza contato.ejs
});

app.get("/estoques", (req, res) => {
  res.render("estoques"); // Renderiza estoques.ejs
});

app.get("/proposta", (req, res) => {
  res.render("proposta"); // Renderiza proposta.ejs
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 app.post("/enviar-contato", (req, res) => {
        let nome = req.body.name;
        let email = req.body.email;
        let telefone = req.body.telefone;
        let mensagem = req.body.message;

        // Aqui você processaria os dados (salvaria no banco de dados, enviaria um email, etc.)
        console.log(`Formulário de Contato Recebido: Nome: ${nome}, Email: ${email}, Telefone: ${telefone}, Mensagem: ${mensagem}`);

        res.send("Formulário de Contato Recebido com Sucesso!");
    });

    app.post("/enviar-proposta", (req, res) => {
        let nome = req.body.name;
        let email = req.body.email;
        let telefone = req.body.telefone;
        let cpf = req.body.cpf;
        let mensagem = req.body.message;

        // Aqui você processaria os dados (salvaria no banco de dados, etc.)
        console.log(`Formulário de Proposta Recebido: Nome: ${nome}, Email: ${email}, Telefone: ${telefone}, CPF: ${cpf}, Mensagem: ${mensagem}`);

        res.send("Formulário de Proposta Recebido com Sucesso!");
    });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
