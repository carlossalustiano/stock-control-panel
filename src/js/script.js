import api from '../services/api.js'

let produtos = [];

async function getProdutos() {
    try {
        let response = await api.get('/produtos')
        produtos = response.data
    } catch (error) {
        console.log('Error no servidor, tente novamente.')
    }
}

getProdutos();

let boxInformation = document.querySelector('.box-information');
let h2 = boxInformation.querySelector('h2');
h2.innerHTML = 'Olá'