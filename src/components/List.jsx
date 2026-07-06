import React from 'react';

function List({ items, deleteItem, editItem, toggleComplete }) {
  if (items.length === 0) {
    return <p>No hay elementos.</p>;
  }

  return (
    <ul className="list">
      {items.map(item => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id)}
          />
          <span className="item-value">{item.value}</span>
          <button onClick={() => editItem(item)}>Editar</button>
          <button onClick={() => deleteItem(item.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default List;