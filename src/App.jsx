import React, { useState } from 'react';

function Form({ onCalculate }) {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(altura, peso);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Altura (m):
        <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
      </label>
      <label>
        Peso (kg):
        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
      </label>
      <button type="submit">Calcular</button>
    </form>
  );
}

function ImcCalculator({ altura, peso }) {
  const calcularImc = () => {
    if (altura === 0 || peso === 0) return 'Altura e peso são obrigatórios';

    const imc = peso / (altura * altura);
    return imc.toFixed(2);
  };

  const classificarImc = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc >= 18.5 && imc < 25) return 'Peso normal';
    if (imc >= 25 && imc < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  const imcValue = calcularImc();
  const classificacao = classificarImc(imcValue);

  return (
    <div>
      <p>Seu IMC é: {imcValue}</p>
      <p>Classificação: {classificacao}</p>
    </div>
  );
}

function App() {
  const [resultado, setResultado] = useState(null);

  const handleCalculate = (altura, peso) => {
    setResultado({ altura, peso });
  };

  return (
    <div>
      <h1>Calculadora de IMC</h1>
      <Form onCalculate={handleCalculate} />
      {resultado && <ImcCalculator altura={resultado.altura} peso={resultado.peso} />}
    </div>
  );
}

export default App;