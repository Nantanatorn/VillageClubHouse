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
public class PaymentController : ControllerBase { 

    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public PaymentController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("pay")]
    [Authorize]
    public async Task<IActionResult> MakePayment([FromBody] PaymentRequestModel request)
    {
        try
        {
            var reservation = await _context.Reservations
                .Include(r => r.Facility)
                .FirstOrDefaultAsync(r => r.R_id == request.R_id);

            if (reservation == null)
            {
                return NotFound(new { message = "ไม่พบรายการจอง" });
            }

            // ✅ คำนวณยอดชำระจากราคา * จำนวนชั่วโมง
            decimal facPrice = reservation.Facility?.Fac_price ?? 0;
            int duration = reservation.R_Duration > 0 ? reservation.R_Duration : 1;

            decimal payAmount = facPrice * duration/ 2 ;

            var payment = new PaymentModel
            {
                R_id = reservation.R_id,
                Pay_Amount = payAmount,
                Pay_Date = DateTime.Now,
                Pay_Method = request.Pay_Method,
                Pay_Status = "Pending"
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "บันทึกการชำระเงินเรียบร้อย", payment });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาด", error = ex.Message });
        }
    }

    [HttpGet("getresavtionhis")]
    [Authorize]
    public async Task<IActionResult> GetReservationHistoryByToken()
    {
        try
        {
            // ✅ ดึง UserId จาก JWT Token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { message = "ไม่สามารถอ่านรหัสผู้ใช้จาก Token ได้" });
            }

            var result = await _context.ReservationViewModels
                .Where(r => r.Id == userId) // <-- ต้องมี UserId ใน View
                .ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound(new { message = "ไม่พบประวัติการจองของผู้ใช้" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "เกิดข้อผิดพลาดขณะดึงข้อมูล",
                error = ex.Message
            });
        }
    }

    [HttpGet("Paymentall")]
    public async Task<IActionResult> GetAllPaymentViews()
    {
        try
        {
            var data = await _context.paymentViewModels.ToListAsync();

            if (data == null || !data.Any())
            {
                return NotFound(new { message = "ไม่พบข้อมูลการชำระเงิน" });
            }

            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "เกิดข้อผิดพลาดขณะดึงข้อมูลการชำระเงิน",
                error = ex.Message
            });
        }
    }

    [HttpGet("getReservationStatusAll")]
    public async Task<IActionResult> GetReservationStatusAll()
    {
        try
        {
            var result = await _context.ReservationStatusViewModels.ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound(new { message = "ไม่พบข้อมูลสถานะการจอง" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "เกิดข้อผิดพลาดในการดึงข้อมูล",
                error = ex.Message
            });
        }
    }

    [HttpPut("updatePaymentStatus/{pay_ID}")]
    public async Task<IActionResult> UpdatePaymentStatus(int pay_ID, [FromBody] UpdatePaymentStatusRequest request)
    {
        try
        {
            var payment = await _context.Payments.FindAsync(pay_ID);

            if (payment == null)
            {
                return NotFound(new { message = "ไม่พบรายการชำระเงินที่ระบุ" });
            }

            payment.Pay_Status = request.Pay_Status;
            payment.Verified_By = request.Verified_By; // ใส่ ID หรือชื่อ Admin ที่อนุมัติ
            payment.Verified_At = DateTime.Now;

            _context.Payments.Update(payment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "อัปเดตสถานะการชำระเงินสำเร็จ", payment });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "เกิดข้อผิดพลาดขณะอัปเดตสถานะการชำระเงิน",
                error = ex.Message
            });
        }
    }

}