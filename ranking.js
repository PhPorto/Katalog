fetch("http://localhost:3000/ranking")
  .then(res => res.json())
  .then(dados => {
    const tbody = document.querySelector("#rankingTabela tbody");
    if (dados.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>Nenhuma contribuição encontrada.</td></tr>";
      return;
    }
    dados.forEach(({ nome, musica, valor }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${nome}</td>
        <td>${musica}</td>
        <td>R$ ${valor.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(() => {
    document.querySelector("#rankingTabela tbody").innerHTML = "<tr><td colspan='3'>Erro ao carregar o ranking.</td></tr>";
  });
