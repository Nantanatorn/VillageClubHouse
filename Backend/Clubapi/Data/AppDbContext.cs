using Microsoft.EntityFrameworkCore;
using ClubAPI.Models;

namespace ClubAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }  // ✅ สร้างตาราง Users
}
