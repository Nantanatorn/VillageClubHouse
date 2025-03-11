namespace ClubAPI.Models;

public class UpdateUserModel
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public DateTime? BirthDate { get; set; } 
    public string? Password { get; set; } 
    public string Email { get; set; } = string.Empty;
}
