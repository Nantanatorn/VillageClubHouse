using System.ComponentModel.DataAnnotations;

public class FacilitiesCreateModel
{
    [Required]
    public string Fac_Name { get; set; } = string.Empty;

    [Required]
    public string Fac_Description { get; set; } = string.Empty;

    [Required]
    public int Fac_Capacity { get; set; }
    public string Fac_Status { get; set; } = "Available";
}