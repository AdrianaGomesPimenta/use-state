import './App.css';

import { useState } from 'react'

function App() {

const [endereco, setEndereco] = useState ({})

function manipularEndereco (evento) {

  const cep = evento.target.value

  setEndereco({
    cep
  })

  if (cep && cep.length ===8){
    //Obter cep
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(resposta => resposta.json())
    .then(dados => {
      setEndereco(enderecoAntigo => {
        return{
        ...enderecoAntigo,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
        }
      })
    })
  }
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Consulta de CEP</h1>
        <input 
        className='cep-input'
        placeholder='Digite o CEP' 
        onChange={manipularEndereco}/>
        <ul>
          <li><span>CEP:</span> {endereco.cep}</li>
          <li><span>Bairro:</span> {endereco.bairro}</li>
          <li><span>Cidade:</span> {endereco.cidade}</li>
          <li><span>Estado:</span> {endereco.estado}</li>
        </ul>    
      </header>
    </div>
  );
}

export default App;
