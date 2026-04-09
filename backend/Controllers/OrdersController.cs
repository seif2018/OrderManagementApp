using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Models;
using OrderManagementApp.Repositories;

namespace OrderManagementApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;
    public OrdersController(IOrderRepository orderRepository) => _orderRepository = orderRepository;

    [HttpGet] public async Task<IActionResult> GetOrders() => Ok(await _orderRepository.GetAllAsync());

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ClientName)) return BadRequest(new { error = "Le nom du client est requis." });
        if (request.Amount <= 0) return BadRequest(new { error = "Le montant doit Ãªtre > 0." });
        if (!IsValidStatus(request.Status)) return BadRequest(new { error = "Statut invalide." });
        var order = new Order { ClientName = request.ClientName.Trim(), Amount = request.Amount, Status = request.Status ?? "Pending" };
        await _orderRepository.AddAsync(order);
        return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] UpdateStatusRequest request)
    {
        if (!IsValidStatus(request.Status)) return BadRequest(new { error = "Statut invalide." });
        if (!await _orderRepository.UpdateStatusAsync(id, request.Status)) return NotFound(new { error = "Commande non trouvÃ©e." });
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(Guid id)
    {
        if (!await _orderRepository.DeleteAsync(id)) return NotFound(new { error = "Commande non trouvÃ©e." });
        return NoContent();
    }

    private static bool IsValidStatus(string? s) => s == "Pending" || s == "Completed" || s == "Cancelled";
}

public class CreateOrderRequest { public string ClientName { get; set; } = ""; public decimal Amount { get; set; } public string? Status { get; set; } }
public class UpdateStatusRequest { public string Status { get; set; } = ""; }