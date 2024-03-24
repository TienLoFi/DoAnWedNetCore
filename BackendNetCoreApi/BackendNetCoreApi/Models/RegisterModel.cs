using System.ComponentModel.DataAnnotations;

namespace BackendNetCoreApi.Models
{
    public class RegisterModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }
    }
}
