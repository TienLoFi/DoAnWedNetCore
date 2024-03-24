using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendNetCoreApi.Models
{
    public class Product
    {

        [Key]
        public int Id { get; set; }
        public int Category_Id { get; set; }
        public int Brand_Id { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string? Slug { get; set; }
        public double Price { get; set; }
        public int Qty { get; set; }
        public string? Image { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string Description { get; set; }
        [Column(TypeName = "text")]
        public string Detail { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? UpdateBy { get; set; }
        public int? Status { get; set; }

        //public List<ProductSale> ProductSales { get; set; }


    }
}
