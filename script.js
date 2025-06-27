let estoque = [];
let editandoIndex = null;

// Carregar estoque salvo
function carregarEstoque() {
  const dados = localStorage.getItem("estoquePG");
  if (dados) {
    estoque = JSON.parse(dados);
  }
}

// Salvar estoque
function salvarEstoque() {
  localStorage.setItem("estoquePG", JSON.stringify(estoque));
}

// Renderizar estoque na tela
function renderizarEstoque() {
  const lista = document.getElementById("listaEstoque");
  lista.innerHTML = "";
  estoque.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "categoria";
    div.innerHTML = `
      <strong>${item.nome}</strong> (Qtd: ${item.quantidade})<br>
      Categoria: ${item.categoria}<br>
      Cor: <span style="color:${item.cor.toLowerCase()}">${item.cor}</span><br>
      <em>${item.bio}</em><br>
      <button class="botao-editar" onclick="editarItem(${i})">Editar</button>
      <button class="botao-apagar" onclick="removerItem(${i})">Remover</button>
    `;
    lista.appendChild(div);
  });

  const botao = document.querySelector("#form-add button");
  botao.textContent = editandoIndex !== null ? "Salvar Edição" : "Adicionar";
}

// Adicionar ou editar item
function adicionarItem() {
  const nome = document.getElementById("itemNome").value.trim();
  const categoria = document.getElementById("itemCategoria").value.trim();
  const quantidade = parseInt(document.getElementById("itemQuantidade").value);
  const cor = document.getElementById("itemCor").value.trim();
  const bio = document.getElementById("itemBio").value.trim();

  if (!nome || !categoria || !quantidade || quantidade < 1) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novoItem = { nome, categoria, quantidade, cor, bio };

  if (editandoIndex !== null) {
    estoque[editandoIndex] = novoItem;
    editandoIndex = null;
  } else {
    estoque.push(novoItem);
  }

  salvarEstoque();
  renderizarEstoque();
  limparFormulario();
}

// Remover item
function removerItem(i) {
  estoque.splice(i, 1);
  salvarEstoque();
  renderizarEstoque();
}

// Editar item
function editarItem(i) {
  const item = estoque[i];
  document.getElementById("itemNome").value = item.nome;
  document.getElementById("itemCategoria").value = item.categoria;
  document.getElementById("itemQuantidade").value = item.quantidade;
  document.getElementById("itemCor").value = item.cor;
  document.getElementById("itemBio").value = item.bio;
  editandoIndex = i;
  renderizarEstoque();
}

// Limpar formulário
function limparFormulario() {
  document.getElementById("itemNome").value = "";
  document.getElementById("itemCategoria").value = "";
  document.getElementById("itemQuantidade").value = "";
  document.getElementById("itemCor").value = "";
  document.getElementById("itemBio").value = "";
  editandoIndex = null;
  renderizarEstoque();
}

// --- Chat simples (local) ---
let mensagens = [];
const notifSound = document.getElementById("notifSound");

function carregarMensagens() {
  const dados = localStorage.getItem("chatPG");
  if (dados) {
    mensagens = JSON.parse(dados);
  }
  renderizarMensagens();
}

function salvarMensagens() {
  localStorage.setItem("chatPG", JSON.stringify(mensagens));
}

function renderizarMensagens() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";
  mensagens.forEach(msg => {
    const p = document.createElement("p");
    p.textContent = `[${msg.username}] ${msg.text}`;
    messagesDiv.appendChild(p);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
  const username = document.getElementById("username").value.trim() || "Anônimo";
  const text = document.getElementById("messageInput").value.trim();

  if (!text) return alert("Digite uma mensagem");

  mensagens.push({ username, text });
  salvarMensagens();
  renderizarMensagens();

  document.getElementById("messageInput").value = "";
  notifSound.play();
}

// Inicializar
window.onload = () => {
  carregarEstoque();
  renderizarEstoque();
  carregarMensagens();
};
