document.getElementById("pagamentoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const musica = document.getElementById("musica").value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (!nome) {
    alert("Por favor, digite seu nome.");
    return;
  }
  if (!musica) {
    alert("Por favor, escolha uma música.");
    return;
  }
  if (isNaN(valor) || valor < 0.5) {
    alert("Informe um valor mínimo de R$0,50");
    return;
  }

  const usuarioPicPay = "SEU_USUARIO"; // substitua pelo seu usuário PicPay

  const valorFormatado = valor.toFixed(2);
  const url = `https://picpay.me/${usuarioPicPay}/${valorFormatado}`;

  // Abre o pagamento PicPay numa nova aba
  window.open(url, "_blank");

  // Simula confirmação instantânea enviando para backend (para teste local)
  fetch("http://localhost:3000/notificacao-picpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome,
      musica,
      valor,
      status: "paid"  // simulando pagamento confirmado
    })
  })
    .then(() => {
      document.getElementById("status").textContent = `Obrigado, ${nome}! Sua contribuição para "${musica}" de R$${valorFormatado} foi registrada.`;
    })
    .catch(() => {
      document.getElementById("status").textContent = "Erro ao registrar sua contribuição.";
    });
});
