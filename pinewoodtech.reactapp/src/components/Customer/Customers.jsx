import React, { useState, useEffect } from 'react';
import CustomerList from './CustomerList';

const term = "Customers";

function Customers() {
    const [data, setData] = useState([]);
    const [maxId, setMaxId] = useState(0);

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = () => {
        // Simulate fetching data from API
        const customerData = [
            { id: 1, firstname: 'John', age: 22, createdon: '2024-10-01' },
            { id: 2, firstname: 'Zara', age: 42, createdon: '2024-10-22' },
            { id: 3, firstname: 'Levis', age: 35, createdon: '2024-10-01' },
            { id: 4, firstname: 'Clark', age: 28, createdon: '2024-10-11' },
            { id: 5, firstname: 'BnQ', age: 12, createdon: '2023-09-03' }
        ];

        setData(customerData);
        setMaxId(Math.max(...customerData.map(customer => customer.id)));
    };

    const handleCreate = (item) => {
        // Simulate createing item on API
        const newItem = { ...item, id: data.length + 1 };
        setData([...data, newItem]);
        setMaxId(maxId + 1);
    };

    const handleUpdate = (item) => {
        // Simulate update item on API
        const updateData = data.map(customer => customer.id === item.id ? item : customer);
        setData(updateData);
    };

    const handleDelete = (id) => {
        // Simulate deleting item on API
        const updatedData = data.filter(customer => customer.id !== id);
        setData(udpateData);
    };

  return (      
      <div>
        <h2>Customers!</h2>
        <CustomerList
            name={term}
            data={data}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            />
    </div>
  );
}

export default Customers;