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
public class FacilitiesCOntroller : ControllerBase {

    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public FacilitiesCOntroller(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpGet("getFacilities")]
    public async Task<IActionResult> GetFacilities()
    {
        try
        {
            var facilities = await _context.Facilities.ToListAsync();
            if (facilities == null || !facilities.Any())
            {
                return NotFound(new { message = "No facilities found." });
            }
            return Ok(facilities);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving facilities.", error = ex.Message });
        }
    }

    [HttpPost("AddFacilities")]
    public async Task<IActionResult> AddFacility([FromBody] FacilitiesCreateModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Fac_Name) || string.IsNullOrWhiteSpace(model.Fac_Description) || model.Fac_Capacity <= 0)
        {
            return BadRequest(new { message = "ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง" });
        }

        var facility = new FacilitiesModel
        {
            Fac_Name = model.Fac_Name,
            Fac_Description = model.Fac_Description,
            Fac_Capacity = model.Fac_Capacity,
            Fac_Used = 0,
            Fac_Empty = model.Fac_Capacity,
            Fac_Status = "Available",
            Fac_img = null // หรือค่าตั้งต้นอื่น
        };

        _context.Facilities.Add(facility);
        await _context.SaveChangesAsync();

        return Ok(new { message = "เพิ่มข้อมูลสำเร็จ", facility });
    }

    

    
}