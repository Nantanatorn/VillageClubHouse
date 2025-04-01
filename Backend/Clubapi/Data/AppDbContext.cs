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
    
    public DbSet<ReservationViewModel> ReservationViewModels { get; set; } = null!;
    public DbSet<PaymentViewModel> paymentViewModels { get; set; } = null!;
    public DbSet<ReservationStatusViewModel> ReservationStatusViewModels { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // บอก EF ว่าอันนี้คือ View และไม่มี Primary Key
    modelBuilder.Entity<ReservationViewModel>().HasNoKey().ToView("Reservationview"); 
    modelBuilder.Entity<PaymentViewModel>().HasNoKey().ToView("PaymentHisView");
    modelBuilder.Entity<ReservationStatusViewModel>().HasNoKey().ToView("ResView");
}
}
