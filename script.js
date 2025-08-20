const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const selectAno = document.getElementById("ano");
const botoesContainer = document.getElementById("botoes-meses");
const calendariosContainer = document.getElementById("calendarios");

// Preencher anos
for (let ano = 2020; ano <= 2030; ano++) {
  const option = document.createElement("option");
  option.value = ano;
  option.textContent = ano;
  selectAno.appendChild(option);
}
selectAno.value = new Date().getFullYear();
selectAno.addEventListener("change", () => {
  gerarCalendarios(parseInt(selectAno.value));
  mostrarMes(0);
});

// Botões dos meses
meses.forEach((mes, index) => {
  const botao = document.createElement("button");
  botao.textContent = mes;
  botao.onclick = () => mostrarMes(index);
  botoesContainer.appendChild(botao);
});

function gerarCalendarios(anoSelecionado) {
  calendariosContainer.innerHTML = "";

  meses.forEach((mes, index) => {
    const calendario = document.createElement("div");
    calendario.className = "calendario";
    calendario.id = `mes-${index}`;

    const titulo = document.createElement("div");
    titulo.className = "mes-titulo";
    titulo.textContent = `${mes} ${anoSelecionado}`;
    calendario.appendChild(titulo);

    diasSemana.forEach((dia) => {
      const header = document.createElement("div");
      header.className = "dia header";
      header.textContent = dia;
      calendario.appendChild(header);
    });

    const primeiroDiaSemana = new Date(anoSelecionado, index, 1).getDay();
    const totalDias = new Date(anoSelecionado, index + 1, 0).getDate();

    for (let i = 0; i < primeiroDiaSemana; i++) {
      const vazio = document.createElement("div");
      vazio.className = "dia vazio";
      calendario.appendChild(vazio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      const diaDiv = document.createElement("div");
      diaDiv.className = "dia";

      const numero = document.createElement("strong");
      numero.textContent = dia;

      const textarea = document.createElement("textarea");
      textarea.placeholder = "Tarefas...";

      const chave = { ano: anoSelecionado, mes: index, dia };

      // Carregar tarefa do backend
      fetch(
        `http://localhost:3000/api/tarefas?ano=${chave.ano}&mes=${chave.mes}&dia=${chave.dia}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.texto) {
            textarea.value = data.texto;
          }
        });

      // Salvar tarefa ao digitar
      textarea.addEventListener("input", () => {
        fetch("http://localhost:3000/api/tarefas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...chave, texto: textarea.value }),
        });
      });

      diaDiv.appendChild(numero);
      diaDiv.appendChild(textarea);
      calendario.appendChild(diaDiv);
    }

    calendariosContainer.appendChild(calendario);
  });
}

function mostrarMes(indice) {
  document.querySelectorAll(".calendario").forEach((mes, i) => {
    mes.classList.toggle("ativo", i === indice);
  });
}

gerarCalendarios(parseInt(selectAno.value));
mostrarMes(0);
