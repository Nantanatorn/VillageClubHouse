namespace ClubAPI.Models;
public class AddEmpModel
{
    public string IdCard { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; } 
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Status { get; set; } = string.Empty;
}