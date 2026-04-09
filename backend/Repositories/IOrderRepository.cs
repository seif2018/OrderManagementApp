namespace OrderManagementApp.Repositories;
using OrderManagementApp.Models;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetAllAsync();
    Task<Order?> GetByIdAsync(Guid id);
    Task AddAsync(Order order);
    Task<bool> UpdateStatusAsync(Guid id, string newStatus);
    Task<bool> DeleteAsync(Guid id);
}