using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ClubAPI.Models;
using ClubAPI.Data;
using Microsoft.AspNetCore.Authorization;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public UserController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }


  [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterModel model)
{
    if (await _context.Users.AnyAsync(u => u.Email == model.Email))
    {
        return BadRequest(new { message = "Email นี้ถูกใช้งานแล้ว" });
    }

    if (await _context.Users.AnyAsync(u => u.Phone == model.Phone))
    {
        return BadRequest(new { message = "เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว" });
    }

    if (await _context.Users.AnyAsync(u => u.IdCard == model.IdCard))
    {
        return BadRequest(new { message = "หมายเลขบัตรประจำตัวประชาชนถูกใช้งานแล้ว" });
    }

    var passwordHash = HashPassword(model.Password);

    var defaultRole = "member"; // ✅ คงค่า Role เป็น "member"
    var defaultDate = new DateTime(2000, 1, 1); // ✅ กำหนดให้ BirthDate เป็น DateTime ตรงๆ

    var user = new User
    {
        IdCard = model.IdCard,
        FirstName = model.FirstName,
        LastName = model.LastName,
        BirthDate = defaultDate, // ✅ ใช้ DateTime แทน String
        Email = model.Email,
        Phone = model.Phone,
        Role = defaultRole,
        Password = passwordHash
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return Ok(new { message = "ยินดีต้อนรับ!" });
}


    // Hash Password (SHA256)
    private string HashPassword(string password)
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }

     [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        if (user == null || !VerifyPassword(model.Password, user.Password))
        {
            return Unauthorized(new { message = "Email หรือ Password ไม่ถูกต้อง" });
        }

        var token = GenerateJwtToken(user);

        return Ok(new { token });
    }

     private string GenerateJwtToken(User user)
    {
    var jwtSettings = _config.GetSection("JwtSettings");

    // ตรวจสอบว่ามี SecretKey หรือไม่
    var secretKey = jwtSettings["SecretKey"];
    if (string.IsNullOrEmpty(secretKey))
    {
        throw new ArgumentNullException("SecretKey", "JWT Secret Key is missing or empty!");
    }

    var keyBytes = Encoding.UTF8.GetBytes(secretKey); //  ป้องกัน key เป็น null

    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.FirstName),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var key = new SymmetricSecurityKey(keyBytes);
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: jwtSettings["Issuer"],
        audience: jwtSettings["Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(1), // Token หมดอายุใน 1 ชม.
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // ฟังก์ชันตรวจสอบ Password
    private bool VerifyPassword(string inputPassword, string storedHash)
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(inputPassword));
            return Convert.ToBase64String(bytes) == storedHash;
        }
    }

    [HttpPut("UserEdit")]
    [Authorize] // ✅ ใช้ JWT Token ตรวจสอบว่าเป็นผู้ใช้ที่ล็อกอินอยู่
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserModel model)
    {
        // ✅ ดึง UserId จาก JWT Token
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null)
        {
            return Unauthorized(new { message = "Unauthorized access" });
        }

        int userId = int.Parse(userIdClaim);

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "ไม่พบผู้ใช้" });
        }

        // ✅ อัปเดตข้อมูลที่ผู้ใช้ส่งมา
        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.Phone = model.Phone;
        
        if (model.BirthDate.HasValue)
        {
            user.BirthDate = model.BirthDate.Value;
        }

        // ✅ ถ้าผู้ใช้ต้องการเปลี่ยนรหัสผ่าน ให้เข้ารหัสใหม่
        if (!string.IsNullOrEmpty(model.Password))
        {
            user.Password = HashPassword(model.Password);
        }

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "อัปเดตข้อมูลสำเร็จ!" });
    }

    [HttpGet("GetallUser")]
    [Authorize(Roles = "Admin")] // ✅ ใช้ JWT Token และต้องเป็น Admin
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.Users
            .Select(u => new
            {
                u.IdCard,
                u.FirstName,
                u.LastName,
                u.Email,
                u.Phone,
                u.Role,
                u.BirthDate
            })
            .ToListAsync();

        if (users == null || users.Count == 0)
        {
            return NotFound(new { message = "ไม่พบข้อมูลผู้ใช้" });
        }

        return Ok(users);
    }
}