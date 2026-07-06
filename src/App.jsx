import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    // Aseguramos que todos los ítems tengan la propiedad 'completed'
    const itemsWithCompleted = storedItems.map(item => ({
      ...item,
      completed: item.completed || false,
    }));
    setItems(itemsWithCompleted);
  }, []);


  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
///////////////////
  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);
//
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    // Validación: no permite cadenas vacías ni solo espacios
    if (!value || value.trim() === '') {
      alert('No se permiten ítems vacíos o con solo espacios.');
      return;
    }

    if (itemToEdit) {
      setItems(
        items.map(item =>
          item.id === itemToEdit.id
            ? { ...item, value }
            : item
        )
      );
      setItemToEdit(null);
    } else {
      const newItem = {
        id: Date.now(),
        value,
        completed: false, // Nuevo ítem no completado
      };
      setItems([...items, newItem]);
    }
  };

  const deleteItem = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      setItems(items.filter(item => item.id !== id));
    }

    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  const toggleComplete = (id) => {
    setItems(
      items.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

   const deleteAll = () => {
    if (items.length === 0) return;
    if (window.confirm('¿Eliminar TODOS los elementos?')) {
      setItems([]);
    }
  };

    const filteredItems = items.filter(item =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <p>Total de elementos: <strong>{items.length}</strong></p>

      {error && <div className="error-message">{error}</div>}

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar ítem..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />

      {/* Botón eliminar todo */}
      {items.length > 0 && (
        <button onClick={deleteAll} className="delete-all-btn">
          Eliminar todos
        </button>
      )}

      {/* Lista filtrada */}
      <List
        items={filteredItems}
        deleteItem={deleteItem}
        editItem={editItem}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}
export default App;