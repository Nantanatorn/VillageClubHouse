namespace ClubAPI.Data;
using Microsoft.EntityFrameworkCore;
using ClubAPI.Models;



public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }  
}
