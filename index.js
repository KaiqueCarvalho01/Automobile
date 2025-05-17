import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// recriando __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve arquivos estáticos da pasta views
app.use(express.static(path.join(__dirname, "views")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
