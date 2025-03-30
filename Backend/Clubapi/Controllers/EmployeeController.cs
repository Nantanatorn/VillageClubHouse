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
using Microsoft.AspNetCore.Mvc.Infrastructure;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase {

    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public EmployeeController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }


      [HttpPost("add-employee")]
    public async Task<IActionResult> Register([FromBody] AddEmpModel model)
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

        var defaultRole = "staff"; // ✅ คงค่า Role เป็น "staff"
        var defaultDate = new DateTime(2000, 1, 1); // ✅ กำหนดให้ BirthDate เป็น DateTime ตรงๆ
        var DefaultStatus = "active"; // ✅ คงค่า Status เป็น "active"

        var user = new User
        {
            IdCard = model.IdCard,
            FirstName = model.FirstName,
            LastName = model.LastName,
            BirthDate = defaultDate, // ✅ ใช้ DateTime แทน String
            Email = model.Email,
            Phone = model.Phone,
            Role = defaultRole,
            Password = passwordHash,
            Position = model.Position,
            Address = model.Address,
            Status = DefaultStatus,
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

        [HttpGet("Empall")]
    public async Task<IActionResult> GetAllEmployee()
    {
        // กรองเฉพาะผู้ใช้ที่มี Role = "staff"
        var users = await _context.Users
            .Where(u => u.Role == "staff") // ✅ กรองเฉพาะผู้ใช้ที่มี Role = "staff"
            .Select(u => new
            {
                u.Id,
                u.IdCard,
                u.FirstName,
                u.LastName,
                u.Email,
                u.Phone,
                u.Role,
                u.Position,
                u.Address,
                u.Status,
                u.BirthDate
            })
            .ToListAsync();

        // ถ้าไม่พบผู้ใช้ที่มี Role = "staff"
        if (!users.Any())
        {
            return NotFound(new { message = "ไม่พบผู้ใช้ที่มี Role = staff" });
        }

        return Ok(users);
    }

    [HttpGet("employee/{id}")]
public async Task<IActionResult> GetEmployeeById(int id)
{
    // ค้นหาพนักงานจาก Id
    var user = await _context.Users
        .Where(u => u.Id == id && u.Role == "staff")  // ค้นหาโดยใช้ Role = "staff" และ Id
        .Select(u => new
        {
            u.Id,
            u.IdCard,
            u.FirstName,
            u.LastName,
            u.Email,
            u.Phone,
            u.Role,
            u.Position,
            u.Address,
            u.Status,
            u.BirthDate
        })
        .FirstOrDefaultAsync();  // ดึงแค่พนักงานคนเดียวตาม id

    if (user == null)
    {
        return NotFound(new { message = "ไม่พบพนักงานที่มี id นี้ หรือไม่ใช่ Role 'staff'" });
    }

    return Ok(user);
}



    [HttpPut("edit-employee/{id}")]
    public async Task<IActionResult> EditEmployee(int id, [FromBody] AddEmpModel model)
    {
        // ค้นหาพนักงานจาก id
        var existingUser = await _context.Users.FindAsync(id);

        if (existingUser == null)
        {
            return NotFound(new { message = "ไม่พบพนักงานที่ต้องการแก้ไข" });
        }

        // ตรวจสอบอีเมล ถ้ามีการเปลี่ยนแปลง
        if (await _context.Users.AnyAsync(u => u.Email == model.Email && u.Id != existingUser.Id))
        {
            return BadRequest(new { message = "Email นี้ถูกใช้งานแล้ว" });
        }

        // ตรวจสอบเบอร์โทร ถ้ามีการเปลี่ยนแปลง
        if (await _context.Users.AnyAsync(u => u.Phone == model.Phone && u.Id != existingUser.Id))
        {
            return BadRequest(new { message = "เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว" });
        }

        // ตรวจสอบหมายเลขบัตรประจำตัวประชาชน ถ้ามีการเปลี่ยนแปลง
        if (await _context.Users.AnyAsync(u => u.IdCard == model.IdCard && u.Id != existingUser.Id))
        {
            return BadRequest(new { message = "หมายเลขบัตรประจำตัวประชาชนถูกใช้งานแล้ว" });
        }

        // แฮชรหัสผ่านใหม่หากมีการเปลี่ยนแปลง
        string passwordHash = !string.IsNullOrWhiteSpace(model.Password) ? HashPassword(model.Password) : existingUser.Password;

        // แก้ไขข้อมูลพนักงาน
        existingUser.FirstName = model.FirstName;
        existingUser.LastName = model.LastName;
        existingUser.Email = model.Email;
        existingUser.Phone = model.Phone;
        existingUser.BirthDate = model.BirthDate;
        existingUser.Position = model.Position;
        existingUser.Address = model.Address;
        existingUser.Status = model.Status ?? existingUser.Status; // ถ้าไม่ได้ระบุ Status จะใช้ค่าเดิม

        // บันทึกการเปลี่ยนแปลง
        _context.Users.Update(existingUser);
        await _context.SaveChangesAsync();

        return Ok(new { message = "ข้อมูลพนักงานถูกอัปเดตสำเร็จ!" });
    }



    [HttpDelete("delete-employee/{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        // ค้นหาพนักงานจาก id
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound(new { message = "ไม่พบพนักงานที่ต้องการลบ" });
        }

        // ลบพนักงานจากฐานข้อมูล
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "พนักงานถูกลบเรียบร้อยแล้ว" });
    }




}