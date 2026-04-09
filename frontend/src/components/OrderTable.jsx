import React, { useMemo } from 'react';
import { updateOrderStatus, deleteOrder } from '../api/ordersApi';

const OrderTable = ({ orders, onOrderUpdated, setError }) => {
  const pendingCount = useMemo(() => orders.filter(o => o.status === 'Pending').length, [orders]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log(`Changement statut de ${id} vers ${newStatus}`);
      await updateOrderStatus(id, newStatus);
      console.log('Statut mis à jour avec succès');
      onOrderUpdated(); // recharge la liste
    } catch (err) {
      console.error('Erreur détaillée:', err);
      // Afficher le message d'erreur de la réponse si disponible
      const errorMsg = err.response?.data?.error || err.message || 'Erreur lors du changement de statut';
      setError(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette commande ?')) return;
    try {
      console.log(`Suppression de ${id}`);
      await deleteOrder(id);
      console.log('Commande supprimée');
      onOrderUpdated();
    } catch (err) {
      console.error('Erreur détaillée:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Erreur lors de la suppression';
      setError(errorMsg);
    }
  };

  return (
    <div>
      <div className="alert alert-info">
        📊 Commandes en attente : <strong>{pendingCount}</strong>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Client</th><th>Montant (€)</th><th>Statut</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id.substring(0, 8)}</td>
              <td>{order.clientName}</td>
              <td>{order.amount.toFixed(2)}</td>
              <td>
                <span className={`badge ${
                  order.status === 'Pending' ? 'bg-warning' :
                  order.status === 'Completed' ? 'bg-success' : 'bg-danger'
                }`}>
                  {order.status}
                </span>
              </td>
              <td>
                <div className="btn-group">
                  {order.status !== 'Completed' && (
                    <button 
                      className="btn btn-sm btn-success" 
                      onClick={() => handleStatusChange(order.id, 'Completed')}
                    >
                      ✓ Terminée
                    </button>
                  )}
                  {order.status !== 'Cancelled' && (
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleStatusChange(order.id, 'Cancelled')}
                    >
                      ✗ Annuler
                    </button>
                  )}
                  <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={() => handleDelete(order.id)}
                  >
                    🗑 Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr><td colSpan="5" className="text-center">Aucune commande</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;