using Microsoft.EntityFrameworkCore;
using MVC_Start.Models;

namespace MVC_Start.DataAccess
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }

    public DbSet<SubProduct> SubProducts { get; set; }

    public DbSet<Company> Companies { get; set; }

    public DbSet<Complaint> Complaints { get; set; }

  }
}