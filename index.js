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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
