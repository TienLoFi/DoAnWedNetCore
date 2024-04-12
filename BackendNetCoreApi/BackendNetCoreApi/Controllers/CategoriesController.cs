using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendNetCoreApi.Data;
using BackendNetCoreApi.Models;
using BackendNetCoreApi.Migrations;

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



        [HttpGet("{limit}/{page}")]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategory(int limit, int page)
        {
            try
            {
                // Kiểm tra và xử lý giá trị của limit và page
                if (limit <= 0 || page <= 0)
                {
                    return BadRequest("Invalid limit or page values. Both should be greater than zero.");
                }

                // Tính toán skip để bỏ qua các sản phẩm ở trang trước đó
                int skipCount = (page - 1) * limit;

                // Lấy danh sách sản phẩm theo limit và page
                var categories = await _context.Categories
                    .Skip(skipCount)
                    .Take(limit)
                    .ToListAsync();

                // Kiểm tra xem có sản phẩm nào không
                if (categories == null || !categories.Any())
                {
                    return NotFound("No products found for the specified limit and page.");
                }

                return categories;
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
        //seach by name product
        [HttpGet("{keysearch}")]
        public async Task<ActionResult<IEnumerable<Category>>> Search(string keysearch)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            var search = await _context.Categories.Where(c => c.Name.Contains(keysearch))
                .Take(8)
                .ToListAsync();

            if (search == null || !search.Any())
            {
                return NotFound("No Categories found matching the search criteria.");
            }

            return Ok(search);

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

        [HttpGet("category/{categoryId}/{limit}/{page}")]
        public async Task<ActionResult<IEnumerable<Products>>> GetProductByCategory(int categoryId, int limit, int page)
        {
            try
            {
                if (categoryId != 0)
                {
                    if (limit <= 0 || page <= 0)
                    {
                        return BadRequest("Invalid limit or page values. Both should be greater than zero.");
                    }

                    var skipCount = (page - 1) * limit;

                    var products = await _context.Products
                        .Where(p => p.Category_Id == categoryId)
                        .Skip(skipCount)
                        .Take(limit)
                        .ToListAsync();

                    if (products == null || !products.Any())
                    {
                        return NotFound("No products found for the specified category and page.");
                    }

                    return Ok(products);
                }
                else
                {
                    return BadRequest("Danh mục không được chỉ định hoặc không hợp lệ.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
