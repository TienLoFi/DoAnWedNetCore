using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace BackendNetCoreApi.Models
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Link { get; set; }
        [DefaultValue(0)]
        public int? SortOrder { get; set; }
        [DefaultValue(0)]
        public int? ParentId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Type { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? UpdateBy { get; set; }
        [DefaultValue(2)]
        public int? Status { get; set; }
    }
}
