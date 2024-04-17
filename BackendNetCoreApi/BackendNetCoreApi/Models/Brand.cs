using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace BackendNetCoreApi.Models
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string? Slug { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public int? Parent_Id { get; set; }
        public string? Image { get; set; }
        public int? Sort_order { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? UpdateBy { get; set; }
        [DefaultValue(2)]
        public int? Status { get; set; }
    }
}
