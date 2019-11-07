import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // states
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // function handleAdd() {
  //   setTech([...tech, newTech]);
  //   setNewTech('');
  // }

  // também usada para reduzir custos de processamento pois a função acima é
  // chamada toda vez que o render é executado (não será feita para toda função
  // e sim para funções que mexem com estado, propriedades e etc)
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // inicia apenas uma vez pois não monitora nada (componentDidMount)
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');
    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // monitora a variável passada no array (componentDidUpdate)
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // um único valor é retornado (evitar fazer algum cálculo toda vez que render
  // é chamado, isso traz custos para a aplicação)
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <strong>Você tem {techSize} tecnologias </strong>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        enviar
      </button>
    </>
  );
}

export default App;
