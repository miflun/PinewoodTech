import React, { useState, useEffect } from 'react';
import CustomerList from './CustomerList';

const term = "Customers";
const API_URL = "/api/Customers";
const headers = {
    'Content-type': 'application/json',
};

function Customers() {
    const [data, setData] = useState([]);
    //const [maxId, setMaxId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = () => {
        // fetch from API
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
        // Simulate fetching data from API
        /*const customerData = [
            { id: 1, firstname: 'John', age: 22, createdon: '2024-10-01' },
            { id: 2, firstname: 'Zara', age: 42, createdon: '2024-10-22' },
            { id: 3, firstname: 'Levis', age: 35, createdon: '2024-10-01' },
            { id: 4, firstname: 'Clark', age: 28, createdon: '2024-10-11' },
            { id: 5, firstname: 'BnQ', age: 12, createdon: '2023-09-03' }
        ];
        setData(customerData);
        setMaxId(Math.max(...customerData.map(customer => customer.id)));*/
    };

    const handleCreate = (item) => {
        // Simulate createing item on API
        /*const newItem = { ...item, id: data.length + 1 };
        setData([...data, newItem]);
        setMaxId(maxId + 1);*/

        console.log(`add item: ${JSON.stringify(item)} @ ${new Date()}`)
        fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ firstName: item.firstName, age: item.age, createdOn: new Date() }),
        })
            .then(response => response.json())
            .then(returnedItem => setData([...data, returnedItem]))
            .catch(error => setError(error));
    };

    const handleUpdate = (updatedItem) => {
        // Simulate update item on API
        /*const updateData = data.map(customer => customer.id === item.id ? item : customer);
        setData(updateData);*/

        console.log(`update item: ${JSON.stringify(updatedItem)}`)
        fetch(`${API_URL}/${updatedItem.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updatedItem),
        })
            .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem : item)))
            .catch(error => setError(error));
    };

    const handleDelete = (id) => {
        // Simulate deleting item on API
        /*const updatedData = data.filter(customer => customer.id !== id);
        setData(udpateData);*/

        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers,
        })
            .then(() => setData(data.filter(item => item.id !== id)))
            .catch(error => console.error('Error deleteing item: ', error));
    };

  return (      
      <div>
        <h2>Customers!</h2>
        <CustomerList
            name={term}
              data={data}
              error={error}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            />
    </div>
  );
}

export default Customers;