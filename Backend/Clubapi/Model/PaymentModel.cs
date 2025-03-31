using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClubAPI.Models
{
    public class PaymentModel
    {
        [Key]
        public int Pay_ID { get; set; }  // Primary Key with auto increment

        [Required]
        public int R_id { get; set; }  // Foreign Key to Reservations

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Pay_Amount { get; set; }  // Amount for payment

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime Pay_Date { get; set; } = DateTime.Now;  // Payment date

        [StringLength(50)]
        public string? Pay_Method { get; set; }  // Payment method (e.g., transfer, QR Code)

        [StringLength(20)]
        public string Pay_Status { get; set; } = "Pending";  // Payment status (Pending, Verified, Rejected)

        [StringLength(10)]
        public string? Verified_By { get; set; }  // ID of the person verifying (admin)

        [Column(TypeName = "datetime")]
        public DateTime? Verified_At { get; set; }  // Date when payment was verified

        // Foreign Key relationships
        [ForeignKey("R_id")]
        public ReservationModel? Reservations { get; set; }  // Reference to Reservation (Foreign Key)
    }
}
