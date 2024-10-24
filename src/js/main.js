const api = axios.create({
    baseURL: 'http://localhost:3000'
});

let produtos;
let containerEstoque = document.querySelector('#container-stock');

async function getProdutos() {
    try {
        const response = await api.get('/produtos');
        produtos = response.data;
        totalProdutos(produtos);
        totalSaldo(produtos);
        mostrarProdutos(produtos);
        filtrarProdutos(produtos);
    } catch (error) {
        console.log('Error no servidor, tente novamente.')
    }
}

function totalProdutos(produtos) {
    let soma = 0;
    for(let item in produtos) {
        soma += produtos[item].quantity;
    }

    let h2Quantidade = document.querySelector('.h2Quantidade');
    h2Quantidade.innerHTML = soma
}

function totalSaldo(produtos) {
  let somaSaldo = 0;
  produtos.forEach(produto => {
    somaSaldo += (produto.quantity * produto.value);
  });
  let totalSaldo = document.querySelector('#text-blue');
  totalSaldo.innerHTML = `R$ ${somaSaldo.toFixed(2)}`;
}


function criarCaixaProduto(produto) {
  let article = document.createElement('article');
  article.classList.add('box-stock');

  let divNome = document.createElement('div');
  divNome.classList.add('stock-data');
  divNome.innerHTML = `<h1>Nome</h1><p>${produto.name}</p>`

  let divQuantidade = document.createElement('div');
  divQuantidade.classList.add('stock-data');
  divQuantidade.innerHTML = `<h1>Quantidade</h1><p>${produto.quantity}</p>`

  let divValor = document.createElement('div');
  divValor.classList.add('stock-data');
  divValor.innerHTML = `<h1>Valor Unitário</h1><p>R$ ${produto.value.toFixed(2)}</p>`

  let divValorTotal = document.createElement('div');
  divValorTotal.classList.add('stock-data');
  divValorTotal.innerHTML = `<h1>Valor Total</h1><p>R$ ${(produto.value * produto.quantity).toFixed(2)}</p>`

  let divBotoes = document.createElement('div');
  divBotoes.classList.add('buttons');
  divBotoes.innerHTML = `
    <span class="material-icons button-edit">edit_note</span>
    <span class="material-icons button-remove">delete</span>
  `;

  article.appendChild(divNome);
  article.appendChild(divQuantidade);
  article.appendChild(divValor);
  article.appendChild(divValorTotal);
  article.appendChild(divBotoes);

  containerEstoque.appendChild(article);
}

function criarElemento(produto) {
  let article = document.createElement('article');
  article.classList.add('box-stock');

  let divNome = document.createElement('div');
  divNome.classList.add('stock-data');
  divNome.innerHTML = `<h1>Nome</h1><p>${produto.name}</p>`

  let divQuantidade = document.createElement('div');
  divQuantidade.classList.add('stock-data');
  divQuantidade.innerHTML = `<h1>Quantidade</h1><p>${produto.quantity}</p>`

  let divValor = document.createElement('div');
  divValor.classList.add('stock-data');
  divValor.innerHTML = `<h1>Valor Unitário</h1><p>R$ ${produto.value.toFixed(2)}</p>`

  let divValorTotal = document.createElement('div');
  divValorTotal.classList.add('stock-data');
  divValorTotal.innerHTML = `<h1>Valor Total</h1><p>R$ ${(produto.value * produto.quantity).toFixed(2)}</p>`

  let divBotoes = document.createElement('div');
  divBotoes.classList.add('buttons');
  divBotoes.innerHTML = `
    <span class="material-icons button-edit">edit_note</span>
    <span class="material-icons button-remove">delete</span>
  `;

  article.appendChild(divNome);
  article.appendChild(divQuantidade);
  article.appendChild(divValor);
  article.appendChild(divValorTotal);
  article.appendChild(divBotoes);

  return article;
}

function mostrarProdutos(produtos) {
  produtos.forEach(produto => criarCaixaProduto(produto));
}

function filtrarProdutos(produtos) {
  let buttonVoltar = document.querySelector('#button-voltar');
  let input = document.querySelector('#search');
  let elemento;

  input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {

      buttonVoltar.style.display = 'block';
      let valorBuscado = input.value.toLowerCase();
      containerEstoque.innerHTML = '';
  
      produtos.forEach(produto => {
        if(valorBuscado === produto.name.toLowerCase()) {
          elemento = criarElemento(produto);
          containerEstoque.appendChild(elemento);
        }
      });
      input.value = '';
    }
  })

  buttonVoltar.addEventListener('click', (event) => {
    buttonVoltar.style.display = 'none';
    containerEstoque.removeChild(elemento);
    mostrarProdutos(produtos);
  })
}

getProdutos()