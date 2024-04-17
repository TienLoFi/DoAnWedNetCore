using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendNetCoreApi.Data;
using BackendNetCoreApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using Microsoft.AspNetCore.Authentication;
namespace BackendNetCoreApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly AppSetting _appSettings;
        private byte[] secretKeyBytes;
        //private SignInManager<AppUser> _signInManager;
        //private UserManager<AppUser> _userManager;
        public UsersController(DataContext context, IOptionsMonitor<AppSetting> optionsMonitor
                      )
        /*    UserManager<AppUser> userManager, SignInManager<AppUser> signInManager*/
        {
            _context = context;
            _appSettings = optionsMonitor.CurrentValue;
            //_signInManager = signInManager;
            //_userManager = userManager;
        }
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromForm] User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromForm] User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'DataContext.Users'  is null.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Login
        [HttpPost("LoginModel")]
        public IActionResult Validate([FromForm] LoginModel model)
        {
            var user = _context.Users.SingleOrDefault(p =>
            p.UserName == model.UserName || p.Email == model.UserName
            && model.Password == p.Password);
            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid username/password"
                });
            }

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Authenticate success",
                Data = GenerateToken(user),

            });


        }
        //create token jwt login
        private string GenerateToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("UserName", user.UserName),
                    new Claim("Id", user.Id.ToString()),

                    //roles

                    new Claim("TokenId", Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes),
                 SecurityAlgorithms.HmacSha256Signature)

            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);
            return jwtTokenHandler.WriteToken(token);

        }

        //Register
        [HttpPost("RegisterModel")]
        public IActionResult Validate1([FromForm] RegisterModel model)
        {
            // Check if the username is already taken
            if (_context.Users.Any(p => p.UserName == model.UserName))
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Username already taken"
                });
            }
            // Check if password and confirm password match
            if (model.Password != model.ConfirmPassword)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Password and Confirm Password do not match"
                });
            }

            // Create a new user
            var newUser = new User
            {
                UserName = model.UserName,
                Password = model.Password, // You should hash the password before storing it
                Email = model.Email,
                // Add other user properties as needed
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Registration successful",
                Data = GenerateToken(newUser)
            });
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        //[AllowAnonymous]
        //[HttpGet("GoogleLogin")]
        //public IActionResult GoogleLogin()
        //{
        //    var redirectUrl = Url.Action("GoogleResponse", "Users");
        //    var properties = _signInManager.ConfigureExternalAuthenticationProperties("Google", redirectUrl);
        //    return Challenge(properties, "Google"); 
        //}

        //[AllowAnonymous]
        //[HttpGet("GoogleResponse")]
        //public async Task<IActionResult> GoogleResponse()
        //{
        //    var info = await _signInManager.GetExternalLoginInfoAsync();
        //    if (info == null)
        //        return Unauthorized(); // Thay vì RedirectToAction, trả về mã lỗi 401 Unauthorized

        //    var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        //    if (user != null)
        //    {
        //        // Đăng nhập người dùng nếu tồn tại
        //        await _signInManager.SignInAsync(user, isPersistent: false);
        //        return Ok(); // Trả về mã thành công 200 OK nếu đăng nhập thành công
        //    }
        //    else
        //    {
        //        // Tạo người dùng mới nếu không tồn tại
        //        user = new AppUser
        //        {
        //            UserName = info.Principal.FindFirst(ClaimTypes.Email).Value,
        //            Email = info.Principal.FindFirst(ClaimTypes.Email).Value
        //        };
        //        var result = await _userManager.CreateAsync(user);
        //        if (result.Succeeded)
        //        {
        //            result = await _userManager.AddLoginAsync(user, info);
        //            if (result.Succeeded)
        //            {
        //                await _signInManager.SignInAsync(user, isPersistent: false);
        //                return Ok(); // Trả về mã thành công 200 OK nếu đăng ký và đăng nhập thành công
        //            }
        //        }
        //    }

        //    return Unauthorized(); // Trả về mã lỗi 401 Unauthorized nếu có lỗi xảy ra
        //}
    }
}