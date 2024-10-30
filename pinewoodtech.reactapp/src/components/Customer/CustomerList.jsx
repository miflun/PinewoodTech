import React, { useState } from 'react';
//import { useState } from 'react';

function CustomerList({ firstname, data, onCreate, onUpdate, onDelete, error }) {

    const [formData, setFormData] = useState({ id: '', firstname: '', age: '', createdon: '' });
    const [editingId, setEditingId] = useState(null);

    const handleFormChange = (event) => {
        const { firstname, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [firstname]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingId) {
            onUpdate(formData);
            setEditingId(null);
        } else {
            onCreate(formData);
        }
        setFormData({ id: '', firstname: '', age: '', createdon: '' });
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        console.log(item.createdon);
        
        setFormData({
            id: item.id,
            firstname: item.firstname,
            age: item.age,
            createdon: item.createdon
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ id: '', firstname: '', age: '', createdon: '' });
    }

  return (
      <div>
          <h2>New {firstname}</h2>
          <form onSubmit={handleSubmit}>
              <label name="id" placeholder="Id" value={formData.id} onChange={handleFormChange} />
              <input type="text" name="firstname" placeholder="Firstname" value={formData.firstname} onChange={handleFormChange} />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleFormChange} />
              <input type="date" name="createdon" placeholder="createdon" value={formData.createdon} onChange={handleFormChange} />
              <button type="submit">{editingId ? 'Udpate' : 'Create'}</button>
              {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button> }
          </form>
          {error && <div>{error.message}</div>}
          <h2>{firstname}</h2>
          <ul>
              <li><span>Firstname</span> - <span>Age</span> - <span>CreatedOn</span></li>
              {data.map(item => (
                  <li key={item.id}>
                      <div>{item.firstname} - {item.age} - {item.createdon}</div>
                      <div><button onClick={() => handleEdit(item)}>Edit</button><span>&nbsp;</span>
                          <button onClick={() => onDelete(item.id)}>Delete</button></div>
                  </li>
              )) }
          </ul>
      </div>
  );
}

export default CustomerList;