require("dotenv").config();
const express = require("express");
const { auth } = require("express-openid-connect");
const path = require("path");

const app = express();

// Configura Auth0
app.use(
  auth({
    authRequired: true, // exige login para todas as rotas
    auth0Logout: true,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    secret: process.env.AUTH0_SECRET,
  })
);

// Serve arquivos estáticos da build do Docusaurus (css, js, imgs, etc)
app.use(express.static(path.join(__dirname, "build")));

// Rota para '/' serve o index.html da build
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Opcional: rota para perfil do usuário autenticado
app.get("/profile", (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
