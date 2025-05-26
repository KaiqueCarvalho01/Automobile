import express from "express";
import db from './config/database.js';
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

import propostaRoutes from './routes/propostaRoutes.js';
import contatoRoutes from './routes/contatoRoutes.js'; // Nova rota de contato


app.set("view engine", "ejs"); // Configura o EJS como template engine
app.use(express.static("public")); // Serve arquivos estáticos da pasta public
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Rotas
app.get("/", (req, res) => {
  res.render("index"); // Renderiza index.ejs
});

app.get("/login", (req, res) => {
  res.render("login"); // Renderiza login.ejs
});

app.use('/contato', contatoRoutes); // Diz ao app para usar o contatoRoutes para qualquer caminho que comece com /contato

app.get("/estoques", (req, res) => {
  res.render("estoques"); // Renderiza estoques.ejs
});

// Diz ao app para usar o propostaRoutes para qualquer caminho que comece com /proposta
app.use('/proposta', propostaRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
