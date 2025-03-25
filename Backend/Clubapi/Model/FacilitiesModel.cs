using System.ComponentModel.DataAnnotations;

namespace ClubAPI.Models;

public class FacilitiesModel
{
  [Key]
    public int Fac_ID { get; set; }
    public string Fac_Name { get; set; } = string.Empty;
    public string Fac_Description { get; set; } = string.Empty;
    public string Fac_Status { get; set; } = "Available";
    public int Fac_Capacity { get; set; }
    public int? Fac_Used { get; set; } = 0;
    public int? Fac_Empty { get; set; }
    public string? Fac_img { get; set; }

}
