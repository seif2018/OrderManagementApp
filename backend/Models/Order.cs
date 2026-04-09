namespace OrderManagementApp.Models;

public class Order
{
    public Guid Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Pending";
}