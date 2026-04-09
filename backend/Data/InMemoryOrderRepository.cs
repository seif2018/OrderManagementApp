using System.Collections.Concurrent;
using OrderManagementApp.Models;
using OrderManagementApp.Repositories;

namespace OrderManagementApp.Data;

public class InMemoryOrderRepository : IOrderRepository
{
    private readonly ConcurrentDictionary<Guid, Order> _orders = new();
    private readonly object _lock = new();

    public Task<IEnumerable<Order>> GetAllAsync() => Task.FromResult(_orders.Values.AsEnumerable());
    public Task<Order?> GetByIdAsync(Guid id) => Task.FromResult(_orders.GetValueOrDefault(id));
    public Task AddAsync(Order order)
    {
        order.Id = Guid.NewGuid();
        _orders[order.Id] = order;
        return Task.CompletedTask;
    }
    public Task<bool> UpdateStatusAsync(Guid id, string newStatus)
    {
        if (_orders.TryGetValue(id, out var order))
        {
            lock (_lock) { order.Status = newStatus; _orders[id] = order; }
            return Task.FromResult(true);
        }
        return Task.FromResult(false);
    }
    public Task<bool> DeleteAsync(Guid id) => Task.FromResult(_orders.TryRemove(id, out _));
}