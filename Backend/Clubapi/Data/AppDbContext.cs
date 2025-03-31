namespace ClubAPI.Data;
using Microsoft.EntityFrameworkCore;
using ClubAPI.Models;



public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }  
    public DbSet<FacilitiesModel> Facilities { get; set; }
    public DbSet<ReservationModel> Reservations { get; set; }
    public DbSet<PaymentModel> Payments { get; set; }  // Add this line to include the Payment model
    public DbSet<Timemodel> TimeSlots { get; set; }  // Add this line to include the TimeSlot model
    
}
