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
    
    }
}
