import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const fetchOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  // Le backend PUT renvoie 200 OK avec un message JSON (dans notre version corrigée)
  // Si votre backend renvoie 204 NoContent, il faut gérer le cas où response.data est vide
  const response = await api.put(`/orders/${id}`, { status });
  // Si le backend renvoie 204, response.data sera null ou vide, ce n'est pas grave
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};