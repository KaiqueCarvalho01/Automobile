# 🚗 Automobile

Este é um projeto desenvolvido por **Kaique Carvalho** e **Rogério de Lima** para a disciplina **Programação de Scripts**. O nosso objetivo é apresentar um site com páginas relacionadas ao tema **venda de automóveis**. A aplicação utiliza tecnologias como Node.js, Express, EJS, SQLite3 e Bootstrap para oferecer uma interface interativa e funcional.

## 🔧 Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Template Engine:** EJS (Embedded JavaScript templates)
* **Manipulação de Dados de Formulário:** Body-parser
* **Banco de Dados:** SQLite3
* **Frontend:** HTML5, CSS3 + Bootstrap, JavaScript
* **Gerenciador de Pacotes:** npm
* **Desenvolvimento:** Nodemon para recarregamento automático do servidor.

---

## Pré-requisitos 📋
Antes de começar, certifique-se de ter instalado em sua máquina:
- [ ] **Node.js** (v22.x ou superior)  
- [ ] **npm** (geralmente já vem com o Node.js)  
- [ ] (Opcional) **Visual Studio Code** ou outro editor de sua preferência
- [ ] Navegador: Chrome, Firefox, Edge ou similar compatível com JavaScript
- [ ] Permissões: A aplicação cria/atualiza o arquivo SQLite automaticamente na pasta config/ — verifique permissões de escrita


---

## 📥 Instalação

1. Clone este repositório:

```
git clone https://github.com/KaiqueCarvalho01/Automobile.git
```

2. Navegue até o diretório do projeto:

```
cd Automobile
```

3. Instale as dependências:

```
npm install
```

---
## 🚀 Como Rodar o Projeto com Node

Para visualizar corretamente o site, é necessário rodá-lo em um **servidor local**, pois as funcionalidades e o roteamento entre páginas não funcionarão corretamente se você abrir os arquivos diretamente no navegador.

Nesse caso, para iniciar o servidor, utilize o seguinte comando no terminal, a partir da raiz do projeto:
```bash
npm run dev
```
Após o servidor ser iniciado com sucesso, abra seu navegador de preferência e acesse:
```bash
http://localhost:5000
```

---
## 🖥️Executando o Projeto com Docker
Este projeto possui suporte completo a Docker, o que significa que você pode executá-lo com apenas alguns comandos, sem precisar instalar Node.js ou qualquer outra dependência diretamente na sua máquina (apenas o Docker).

## Pré-requisitos para o Docker📋

- [ ] **DOCKER**: É necessário ter o Docker e o Docker Compose (geralmente incluído no Docker Desktop) instalados na sua máquina.

Passos para Execução

1. Clone o repositório

2. Construa e Inicie os Containers
Na raiz do projeto (onde o arquivo docker-compose.yml está localizado), execute o seguinte comando:
```bash
docker compose up --build
```

3. Acesse a Aplicação
Após o processo de build ser concluído e você ver os logs do servidor indicando que ele está rodando (ex: ✅ Servidor Híbrido rodando na porta 5000), abra seu navegador e acesse:
```bash
➡️ http://localhost:5001
```

**Nota*: A aplicação roda na porta 5000 dentro do container, mas a expomos na porta 5001 no seu computador para evitar conflitos com outros serviços que possam estar usando a porta 5000 localmente.



---

## 📂 Estrutura do Projeto

```
Automobile/
│
├── config/             # Configurações da aplicação (ex.: acesso ao DB)
├── controllers/        # Lógica de controle das rotas
├── node_modules/       # Dependências instaladas
├── public/             # Arquivos estáticos (CSS, imagens, JS)
├── routes/             # Definição das rotas da aplicação
├── views/              # Templates EJS
├── index.js            # Arquivo principal (servidor Express)
├── package.json        # Metadados e scripts do projeto
├── package-lock.json   # Versões fixas das dependências
└── README.md           # Documentação principal
```


---

### Contribuição 🤝
Contribuições são bem-vindas! Se você deseja contribuir para este projeto, por favor:

* Faça um Fork do projeto.
* Crie uma nova Branch para sua feature ```bash(git checkout -b feature/AmazingFeature).```
* Faça o Commit de suas alterações ```bash(git commit -m 'Add some AmazingFeature').```
* Faça o Push para a Branch ```bash(git push origin feature/AmazingFeature).```
* Abra um Pull Request.

---
Desenvolvido como parte da disciplina de Programação de Scripts. 👨‍💻
