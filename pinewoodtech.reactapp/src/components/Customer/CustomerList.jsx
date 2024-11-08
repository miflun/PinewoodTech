import React, { useState } from 'react';
//import { useState } from 'react';

function CustomerList({ firstName, data, onCreate, onUpdate, onDelete, error }) {

    const [formData, setFormData] = useState({ id: '', firstName: '', age: '', createdOn: '' });
    const [editingId, setEditingId] = useState(null);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
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
        setFormData({ id: '', firstName: '', age: '', createdOn: '' });
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        console.log(item.createdOn);
        
        setFormData({
            id: item.id,
            firstName: item.firstName,
            age: item.age,
            createdOn: item.createdOn
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ id: '', firstName: '', age: '', createdOn: '' });
    }

  return (
      <div>
          <h2>New {firstName}</h2>
          <form onSubmit={handleSubmit}>
              <label name="id" placeholder="Id" value={formData.id} onChange={handleFormChange} />
              <input type="text" name="firstName" placeholder="Firstname" value={formData.firstName} onChange={handleFormChange} />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleFormChange} />
              <input type="datetime" name="createdOn" placeholder="createdon" value={formData.createdOn} readOnly />
              <button type="submit">{editingId ? 'Udpate' : 'Create'}</button>
              {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button> }
          </form>
          {error && <div>{error.message}</div>}
          <h2>{firstName}</h2>
          <ul>
              <li><span>Id - </span><span>FirstName</span> - <span>Age</span> - <span>CreatedOn</span></li>
              {data.map(item => (
                  <li key={item.id}>
                      <div>{item.id} - {item.firstName} - {item.age} - {item.createdOn}</div>
                      <div><button onClick={() => handleEdit(item)}>Edit</button><span>&nbsp;</span>
                          <button onClick={() => onDelete(item.id)}>Delete</button></div>
                  </li>
              )) }
          </ul>
      </div>
  );
}

export default CustomerList;