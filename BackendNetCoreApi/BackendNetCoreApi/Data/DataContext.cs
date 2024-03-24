using BackendNetCoreApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BackendNetCoreApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Product> Products
        {
            get;
            set;
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> Order_details { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<ProductSale> ProductSales { get; set; }

    }
}
