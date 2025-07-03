# Arquivo: Dockerfile

# --- Estágio 1: Build ---
# Usamos uma imagem base do Node.js para construir nossa aplicação
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de definição de pacotes
COPY package*.json ./

# Instala as dependências de produção e desenvolvimento para poder buildar
RUN npm install


COPY . .

# Executa o comando de build do TypeScript
RUN npm run build


# --- Estágio 2: Produção ---
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia os arquivos de definição de pacotes novamente
COPY package*.json ./

# Instala SOMENTE as dependências de produção
RUN npm ci --only=production

# Copia o código transpilado do estágio de 'build' para a imagem final
COPY --from=builder /usr/src/app/dist ./dist

# Copia a pasta public e as views para a imagem final
COPY --from=builder /usr/src/app/views ./views
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/config ./config

# Expõe a porta que a aplicação usa (definida no seu index.ts como 5000)
EXPOSE 5000

# O comando para iniciar a aplicação quando o container for executado
CMD [ "node", "dist/index.js" ]