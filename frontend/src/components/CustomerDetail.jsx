import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/customers/${id}/`)
      .then(response => setCustomer(response.data))
      .catch(error => console.error("Error fetching customer details:", error));
  }, [id]);

  if (!customer) return <p className="loading-text">Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="title">Customer Detail</h1>
          <ul className="details-list">
            <li><strong>顧客ID:</strong> {customer.id}</li>
            <li><strong>名前:</strong> {customer.full_name}</li>
            <li><strong>住所:</strong> {customer.address}</li>
            <li><strong>電話番号:</strong> {customer.phone_number}</li>
            <li><strong>アドレス:</strong> {customer.email}</li>


          </ul>
          
          <h2 className="history-title">購入履歴</h2>
          {customer.purchase_history.length > 0 ? (
            <ul className="purchase-history">
              {customer.purchase_history.map((history, index) => (
                <li key={index} className="purchase-item">
                  <span className="model-name">{history.pc_model}</span>
                  <span className="purchase-date">　{history.purchase_date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">No purchase history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
