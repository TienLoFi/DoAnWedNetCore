using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendNetCoreApi.Data;
using BackendNetCoreApi.Models;

namespace BackendNetCoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly DataContext _context;

        public BrandsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return brand;
        }

        // PUT: api/Brands/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrand(int id, [FromForm] Brand brand, IFormFile image)
        {
            //if (id != brand.Id)
            //{
            //    return BadRequest("Id không hợp lệ");
            //}

            var existingBrand = await _context.Brands.FindAsync(id);

            if (existingBrand == null)
            {
                return NotFound("Không tìm thấy thương hiệu");
            }

            if (image != null)
            {
                var uniqueFileName = /*Guid.NewGuid().ToString() + "_" + */image.FileName;
                var filePath = Path.Combine("wwwroot/images/brands", uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                existingBrand.Image = uniqueFileName;
            }

            existingBrand.Name = brand.Name;
            //existingBrand.Slug = brand.Slug;
            existingBrand.Sort_order = brand.Sort_order;
            existingBrand.Description = brand.Description;
            existingBrand.UpdateBy = brand.UpdateBy;
            existingBrand.Status = brand.Status;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingBrand);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
                {
                    return NotFound("Không tìm thấy thương hiệu");
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Brands
        [HttpPost]
        public async Task<ActionResult<Brand>> PostBrand([FromForm] Brand brand, IFormFile image)
        {
            if (image != null)
            {
                var uniqueFileName = /*Guid.NewGuid().ToString() + "_" + */image.FileName;
                var filePath = Path.Combine("wwwroot/images/brands", uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                brand.Image = uniqueFileName;
                brand.CreatedAt = DateTime.Now;
                brand.Slug = CreateSlug(brand.Name);

                _context.Brands.Add(brand);
                await _context.SaveChangesAsync();
                return Ok(brand);
            }
            else
            {
                return BadRequest("Hình ảnh không hợp lệ");
            }
        }

        // DELETE: api/Brands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            if (_context.Brands == null)
            {
                return NotFound();
            }
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Slug
        private string CreateSlug(string input)
        {
            // Loại bỏ các ký tự không hợp lệ khỏi tên
            string slug = string.Join("-", input.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries));

            // Chuyển tất cả sang chữ thường
            slug = slug.ToLower();

            return slug;
        }
        private bool BrandExists(int id)
        {
            return (_context.Brands?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}