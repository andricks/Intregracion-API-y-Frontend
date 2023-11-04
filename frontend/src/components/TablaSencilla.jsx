// src/components/TablaSencilla.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TablaSencilla() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h1>Tabla Sencilla</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button onClick={() => openDialog(item)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && selectedItem && (
        <dialog open>
          <button onClick={closeDialog}>Cerrar</button>
          <h2>Editar Elemento</h2>
          <form>
            <label>Título:</label>
            <input type="text" value={selectedItem.title} onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })} />
            <button onClick={closeDialog}>Guardar</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default TablaSencilla;
