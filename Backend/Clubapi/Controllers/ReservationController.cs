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
public class ReservationController : ControllerBase { 

    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public ReservationController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }


    [HttpPost("reserve")]
    [Authorize]
    public async Task<IActionResult> CreateReservation([FromBody] ReservationreqModel request)
    {
        try
        {
            // ✅ ดึง User ID จาก Token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { message = "ไม่สามารถอ่านรหัสผู้ใช้จาก Token ได้" });
            }

            // ✅ ตรวจสอบ Facility
            var facility = await _context.Facilities.FindAsync(request.Fac_ID);
            if (facility == null)
            {
                return NotFound(new { message = "ไม่พบสถานที่" });
            }

            // ✅ สร้างรายการจอง
            var reservation = new ReservationModel
            {
                Id = userId,
                Fac_ID = request.Fac_ID,
                R_Date = request.R_Date,
                R_Time = request.R_Time,
                R_Status = "Pending", // default
                R_CreatedAt = DateTime.Now,
                R_UpdatedAt = DateTime.Now,
                R_Duration = request.R_Duration > 0 ? request.R_Duration : 1,
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return Ok(new { message = "จองสำเร็จ", reservation });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาด", error = ex.Message });
        }
        }




}