    using System;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Threading.Tasks;
using BackendNetCoreApi.Data;
using BackendNetCoreApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using BackendNetCoreApi.Data;
using BackendNetCoreApi.Models;
using BackendNetCoreApi.Migrations;
using Azure;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BackendNetCoreApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
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
     

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] Product product, IFormFile image)
        {
            var existingProduct = await _context.Products.FindAsync(id);

            if (existingProduct == null)
            {
                return NotFound("Không tìm thấy sản phẩm");
            }

            if (image != null)
            {
                var uniqueFileName = /*Guid.NewGuid().ToString() + "_" + */image.FileName;
                var filePath = Path.Combine("wwwroot/images/products", uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                existingProduct.Image = uniqueFileName;
            }
            else // Nếu không có hình mới được tải lên, giữ nguyên giá trị hình ảnh từ cơ sở dữ liệu
            {
                existingProduct.Image = existingProduct.Image;
            }

            existingProduct.Category_Id = product.Category_Id;
            existingProduct.Brand_Id = product.Brand_Id;
            existingProduct.Name = product.Name;
            existingProduct.Slug = CreateSlug(product.Name);
            existingProduct.Price = product.Price;
            existingProduct.Qty = product.Qty;
            existingProduct.Description = product.Description;
            existingProduct.Detail = product.Detail;
            existingProduct.UpdateBy = product.UpdateBy;
            existingProduct.Status = product.Status;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingProduct);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound("Không tìm thấy sản phẩm");
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm] Product product, IFormFile image)
        {
            if (image != null)
            {
                var uniqueFileName = /*Guid.NewGuid().ToString() + "_" + */image.FileName;
                var filePath = Path.Combine("wwwroot/images/products", uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                product.Image = uniqueFileName;
                product.CreatedAt = DateTime.Now;
                product.Slug = CreateSlug(product.Name);

                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return Ok(product);
            }
            else
            {
                return BadRequest("Hình ảnh không hợp lệ");
            }
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
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

        //Get Product By ever Category
        [HttpGet("{categoryId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategory(int categoryId)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            if (categoryId != 0)
            {
                // Lọc sản phẩm theo category nếu category được chỉ định
                var products = await _context.Products
                    .Where(p => p.Category_Id == categoryId)
                    .ToListAsync();

                if (products == null || !products.Any())
                {
                    return NotFound();
                }

                return Ok(products);
            }
            else
            {
                return BadRequest("Danh mục không được chỉ định hoặc không hợp lệ.");
            }
        }

        //Get all product by limit and page
        [HttpGet("{limit}/{page}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProduct(int limit, int page)
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
                var products = await _context.Products
                    .Skip(skipCount)
                    .Take(limit)
                    .ToListAsync();

                // Kiểm tra xem có sản phẩm nào không
                if (products == null || !products.Any())
                {
                    return NotFound("No products found for the specified limit and page.");
                }

                return products;
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //get all product by ever category parent
        [HttpGet("{categoryIdParent}/{limit}/{page}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategoryParent(int categoryIdParent, int limit, int page)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            if (categoryIdParent != 0)
            {
                //Lọc tất cả id menu con theo parent id 
                var cate = await _context.Categories.Where(c => c.Parent_Id == categoryIdParent)
                    .Select(c => c.Id)
                    .ToListAsync();

                // Lọc sản phẩm theo category nếu category được chỉ định
                var products = await _context.Products
                    .Where(p => cate.Contains(p.Category_Id))
                    .ToListAsync();

                // Kiểm tra và xử lý giá trị của limit và page
                if (limit <= 0 || page <= 0)
                {
                    return BadRequest("Invalid limit or page values. Both should be greater than zero.");
                }

                // Tính toán skip để bỏ qua các sản phẩm ở trang trước đó
                int skipCount = (page - 1) * limit;

                // Lấy danh sách sản phẩm theo limit và page
                var paginatedProducts = products
                    .Skip(skipCount)
                    .Take(limit).ToList();



                if (paginatedProducts == null || !paginatedProducts.Any())
                {
                    return NotFound();
                }

                return Ok(paginatedProducts);
            }
            else
            {
                return BadRequest("Danh mục không được chỉ định hoặc không hợp lệ.");
            }
        }




        //seach by name product
        [HttpGet("{keysearch}")]
        public async Task<ActionResult<IEnumerable<Product>>> Search(string keysearch)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var search = await _context.Products.Where(c => c.Name.Contains(keysearch))
                .Take(8)
                .ToListAsync();

            if (search == null || !search.Any())
            {
                return NotFound("No products found matching the search criteria.");
            }

            return Ok(search);

        }
        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        //get product sale
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetSaledProducts()
        {
            if (_context.ProductSales == null)
            {
                return NotFound();
            }
            if (_context.Products == null)
            {
                return NotFound();
            }
            DateTime currentDate = DateTime.Now;
            var saledProducts = await _context.Products
        .Join(
            _context.ProductSales,
            product => product.Id,
            productSale => productSale.ProductId,
            (product, productSale) => new
            {
                ProductId = product.Id,
                ProductSaleId = productSale.Id,
                // Add other attributes from the Product table
                NameSale = product.Name,
                PriceSale = product.Price,
                ImageSale = product.Image,
                DescriptionSale = product.Description,
                DetailSale = product.Detail,
                // Add attributes from the ProductSale table

                DiscountSale = productSale.Discount,
                QtySale = productSale.Qty,
                Date_BeginSale = productSale.Date_Begin,
                Date_EndSale = productSale.Date_End,
                CreatedAtSale = productSale.CreatedAt,

            }
        )
        .Where(ps => currentDate >= ps.Date_BeginSale && currentDate <= ps.Date_EndSale)
        .ToListAsync();


            if (saledProducts == null || saledProducts.Count == 0)
            {
                return NotFound();
            }

            return Ok(saledProducts);


        }





    }
}