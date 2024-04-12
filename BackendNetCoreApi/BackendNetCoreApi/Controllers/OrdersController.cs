using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendNetCoreApi.Data;
using BackendNetCoreApi.Models;
using BackendNetCoreApi.Models.DTO;

namespace BackendNetCoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
        {
            // Xử lý tạo đơn hàng
            var order = new Order
            {
                UserId = orderDto.UserId,
                DeliveryName = orderDto.DeliveryName,
                DeliveryPhone = orderDto.DeliveryPhone,
                DeliveryAddress = orderDto.DeliveryAddress,
                DeliveryGender = orderDto.DeliveryGender,
                Note = orderDto.Note,
                Total = orderDto.Total,
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Xử lý tạo chi tiết đơn hàng
            foreach (var detailDto in orderDto.OrderDetails)
            {
                var orderDetail = new OrderDetail
                {
                    Order_id = order.Id,
                    Product_id = detailDto.ProductId,
                    Discount = detailDto.Discount,
                    Price = detailDto.Price,
                    Amount = detailDto.Amount,
                    Qty = detailDto.Qty,

                };

                _context.Order_details.Add(orderDetail);
            }

            await _context.SaveChangesAsync();

            return Ok(new { Order_id = order.Id });
        }
    
// DELETE: api/Orders/5
[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
