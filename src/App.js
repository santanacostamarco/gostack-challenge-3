import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id);
    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(repository => (repository.id === id))
      repositoryIndex >= 0 
        && setRepositories(repositories.filter(repository => (repository.id !== id)));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository.id}>
            <a href={repository.url}>
              {repository.title}
            </a>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
