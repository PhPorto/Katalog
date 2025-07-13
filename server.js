const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./contribuicoes.json";

function carregarContribuicoes() {
  if (fs.existsSync(FILE)) {
    return JSON.parse(fs.readFileSync(FILE));
  }
  return [];
}

function salvarContribuicoes(dados) {
  fs.writeFileSync(FILE, JSON.stringify(dados, null, 2));
}

app.post("/notificacao-picpay", (req, res) => {
  const { nome, musica, valor, status } = req.body;

  if (status === "paid" && nome && musica && valor) {
    const dados = carregarContribuicoes();
    dados.push({ nome, musica, valor });
    salvarContribuicoes(dados);
    console.log(`Pagamento confirmado: ${nome} - ${musica} - R$${valor}`);
    return res.sendStatus(200);
  }

  res.status(400).json({ error: "Dados inválidos" });
});

app.get("/ranking", (req, res) => {
  const dados = carregarContribuicoes();
  dados.sort((a, b) => b.valor - a.valor);
  res.json(dados);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
