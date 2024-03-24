using System.ComponentModel.DataAnnotations;

namespace BackendNetCoreApi.Models
{
    public class ProductSale
    {

        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Discount { get; set; }
        public int Qty { get; set; }
        public DateTime Date_Begin { get; set; }
        public DateTime Date_End { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? UpdateBy { get; set; }
    }
}
