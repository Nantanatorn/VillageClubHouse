using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClubAPI.Models;

public class ReservationModel
{
    [Key]
    public int R_id { get; set; }

    [Required]
    public int Id { get; set; }

    [Required]
    public int Fac_ID { get; set; }

    [Required]
    [Column(TypeName = "datetime")]
    public DateTime R_Date { get; set; }

    [Required]
    public string R_Time { get; set; } = string.Empty;

    public string R_Status { get; set; } = "Pending";

    [Column(TypeName = "datetime")]
    public DateTime R_CreatedAt { get; set; } = DateTime.Now;

    [Column(TypeName = "datetime")]
    public DateTime? R_UpdatedAt { get; set; }

    public int R_Duration { get; set; } = 1;

    [StringLength(255)]
    public string? R_Note { get; set; }

    // ✅ ความสัมพันธ์แบบ Foreign Key
    [ForeignKey("Id")]
    public User? User { get; set; }

    [ForeignKey("Fac_ID")]
    public FacilitiesModel? Facility { get; set; }
}
