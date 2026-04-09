import React, { useState, useEffect, useCallback } from 'react';
import { fetchOrders } from './api/ordersApi';
import OrderTable from './components/OrderTable';
import OrderForm from './components/OrderForm';

function App() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les commandes. VÃ©rifiez que lâ€™API est lancÃ©e.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">📦 Gestion des commandes clients</h1>
      {error && (
        <div className="alert alert-danger alert-dismissible">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}
      <OrderForm onOrderCreated={loadOrders} setError={setError} />
      {loading ? <div className="text-center">Chargement...</div> : <OrderTable orders={orders} onOrderUpdated={loadOrders} setError={setError} />}
    </div>
  );
}

export default App;