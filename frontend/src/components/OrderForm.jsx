import React, { useState } from 'react';
import { createOrder } from '../api/ordersApi';

const OrderForm = ({ onOrderCreated, setError }) => {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!clientName.trim()) {
      setError('Le nom du client est requis.');
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Le montant doit être un nombre positif.');
      return;
    }

    setLoading(true);
    try {
      await createOrder({ clientName: clientName.trim(), amount: amt, status });
      setClientName('');
      setAmount('');
      setStatus('Pending');
      onOrderCreated();
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">➕ Nouvelle commande</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom du client *</label>
            <input type="text" className="form-control" value={clientName}
                   onChange={(e) => setClientName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Montant (€) *</label>
            <input type="number" step="0.01" className="form-control" value={amount}
                   onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Statut initial</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Création...' : 'Créer la commande'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;