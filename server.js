require("dotenv").config();
const express = require("express");
const { auth } = require("express-openid-connect");
const path = require("path");

const app = express();

// Configura Auth0
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

// Serve os arquivos do Docusaurus
app.use("/", express.static(path.join(__dirname, "build")));

// Use a porta fornecida pela Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
