using System.ComponentModel.DataAnnotations;

namespace BackendNetCoreApi.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }
        public int Order_id { get; set; }
        public int Product_id { get; set; }
        public double Discount { get; set; }
        public double Amount { get; set; }
        public double Price { get; set; }
        public int Qty { get; set; }
    }
}
