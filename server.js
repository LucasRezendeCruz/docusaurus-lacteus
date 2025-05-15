require("dotenv").config();
const express = require("express");
const { auth } = require("express-openid-connect");
const path = require("path");

const app = express();

app.use(
  auth({
    authRequired: true,
    auth0Logout: true,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    secret: process.env.AUTH0_SECRET,
  })
);

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, "build")));

// Rota fallback para servir index.html para qualquer rota que não exista
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
