import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

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
      setItems(items.map(item => item.id ===
      itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value }]);
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

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <p>Total de elementos: <strong>{items.length}</strong></p>
      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;