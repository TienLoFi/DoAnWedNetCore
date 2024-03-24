using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace BackendNetCoreApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string? Gender { get; set; }
        public string Email { get; set; }
        public int Phone { get; set; }
        public int? Roles { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? UpdateBy { get; set; }
        [DefaultValue(2)]
        public int? Status { get; set; }
    }
}
