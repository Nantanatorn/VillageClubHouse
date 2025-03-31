using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClubAPI.Models
{
    public class Timemodel
    {
        [Key]
        public int Slot_ID { get; set; }  // Primary Key

        [Required]
        public int Fac_ID { get; set; }

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan StartTime { get; set; }  // Start time of the slot

        [Required]
        [Column(TypeName = "time")]
        public TimeSpan EndTime { get; set; }  // End time of the slot

        [StringLength(50)]
        public string? Label { get; set; }  // Label like '17:00 - 19:00 PM'

        public bool IsAvailable { get; set; } = true;  // Availability (default is true)

        // Foreign Key relationship to Facilities
        [ForeignKey("Fac_ID")]
        public FacilitiesModel? Facility { get; set; }
    }
}
