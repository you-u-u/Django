import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');

  const fetchCustomers = () => {
    axios.get('http://127.0.0.1:8000/api/customers/', {
      params: {
        query: searchQuery,
        start_date: startDate,
        end_date: endDate,
        sort_by: sortBy,
        order: order,
      },
    })
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery, startDate, endDate, sortBy, order]);

  return (
    <div>
      <h1>Customer List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
          検索
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortBy('id')}>ID</th>
            <th onClick={() => setSortBy('full_name')}>Name</th>
            <th>Name (Kana)</th>
            <th>Purchase History</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.full_name}</td>
              <td>{customer.full_name_kana}</td>
              <td>
                {customer.purchase_history.map((history, index) => (
                  <div key={index}>{history.pc_model} ({history.purchase_date})</div>
                ))}
              </td>
              <td>
                <button onClick={() => window.location.href = `/customer/${customer.id}`}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
