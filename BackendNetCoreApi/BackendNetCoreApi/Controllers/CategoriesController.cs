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

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public CategoriesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromForm] Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(id);

            if (existingCategory == null)
            {
                return NotFound("Không tìm thấy danh mục");
            }

            existingCategory.Name = category.Name;
            existingCategory.Slug = CreateSlug(category.Name);
            existingCategory.Parent_Id = category.Parent_Id;
            existingCategory.Sort_Order = category.Sort_Order;
            existingCategory.Description = category.Description;
            existingCategory.UpdateBy = category.UpdateBy;
            existingCategory.Status = category.Status;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingCategory);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound("Không tìm thấy danh mục");
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromForm] Category category)
        {
            if (_context.Categories == null)
            {
                return Problem("Entity set 'DataContext.Categories'  is null.");
            }
            category.CreatedAt = DateTime.Now;
            category.Slug = CreateSlug(category.Name);

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return Ok(category);

        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
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

        //Get Category ByParent Id
        [HttpGet("{parentId}")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategoryByParentId(int parentId)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            if (parentId != 0)
            {
                var categories = await _context.Categories
                    .Where(p => p.Parent_Id == parentId)
                    .ToListAsync();

                if (categories == null || !categories.Any())
                {
                    return NotFound("Không tìm thấy danh mục đã chỉ định.");
                }

                return Ok(categories);
            }
            else
            {
                return BadRequest("Danh mục không được chỉ định hoặc không hợp lệ.");
            }
        }

        //Get All Category ByParent Id minus parent category
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategoryMinusParentCate()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var categories = await _context.Categories
                .Where(p => p.Parent_Id != 1)
                .ToListAsync();

            return Ok(categories);

        }
        private bool CategoryExists(int id)
        {
            return (_context.Categories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
