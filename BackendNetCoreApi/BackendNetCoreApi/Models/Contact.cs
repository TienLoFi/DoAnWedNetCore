using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace BackendNetCoreApi.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }
        public int Phone { get; set; }
        public string Title { get; set; }

        [Column(TypeName = "text")]
        public string Content { get; set; }
        public int? ReplayId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? UpdateBy { get; set; }
        [DefaultValue(2)]
        public int? Status { get; set; }
    }
}
