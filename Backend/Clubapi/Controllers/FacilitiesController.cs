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

    [HttpGet("getFacilitiesByName")]
    public async Task<IActionResult> GetFacilitiesByName([FromQuery] string name)
    {
        try
        {
            // ตรวจสอบว่าได้รับชื่อหรือไม่
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest(new { message = "Please provide a facility name." });
            }

            // ค้นหาจาก Fac_Name
            var facilities = await _context.Facilities
                .Where(f => f.Fac_Name.Contains(name)) // ค้นหาตามชื่อที่มีคำนี้
                .ToListAsync();

            // ถ้าไม่พบข้อมูล
            if (facilities == null || !facilities.Any())
            {
                return NotFound(new { message = "No facilities found with the provided name." });
            }

            // ส่งกลับข้อมูล
            return Ok(facilities);
        }
        catch (Exception ex)
        {
            // ถ้ามีข้อผิดพลาดในการค้นหา
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

    [HttpPut("editFacility/{id}")]
    public async Task<IActionResult> EditFacility(int id, [FromBody] FacilitiesCreateModel model)
    {
        try
        {
            // ตรวจสอบว่าได้รับข้อมูลที่ต้องการหรือไม่
            if (string.IsNullOrWhiteSpace(model.Fac_Name) || string.IsNullOrWhiteSpace(model.Fac_Description) || model.Fac_Capacity <= 0)
            {
                return BadRequest(new { message = "ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง" });
            }

            // ค้นหา Facility ที่จะอัปเดต
            var facility = await _context.Facilities.FindAsync(id);

            if (facility == null)
            {
                return NotFound(new { message = "ไม่พบข้อมูล Facility ที่ต้องการแก้ไข" });
            }

            // แก้ไขข้อมูล Facility
            facility.Fac_Name = model.Fac_Name;
            facility.Fac_Description = model.Fac_Description;
            facility.Fac_Capacity = model.Fac_Capacity;
            facility.Fac_Empty = model.Fac_Capacity; // อัปเดตจำนวนที่ว่าง
            facility.Fac_Used = 0; // หรือจะตั้งค่าใหม่ตามความต้องการ

            // ถ้ามีการระบุ status ใน model ให้ปรับปรุง
            if (!string.IsNullOrWhiteSpace(model.Fac_Status))
            {
                facility.Fac_Status = model.Fac_Status; // แก้ไข status
            }

            // บันทึกการแก้ไข
            _context.Facilities.Update(facility);
            await _context.SaveChangesAsync();

            return Ok(new { message = "แก้ไขข้อมูล Facility สำเร็จ", facility });
        }
        catch (Exception ex)
        {
            // ถ้ามีข้อผิดพลาดในการอัปเดต
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการแก้ไขข้อมูล Facility", error = ex.Message });
        }
    }

    // TimeSlot Management


    [HttpGet("getTimetable/{facilityId}")]
    public async Task<IActionResult> GetTimetableByFacility(int facilityId)
    {
        var timetables = await _context.TimeSlots
            .Where(t => t.Fac_ID == facilityId)
            .Select(t => new
            {
                t.Slot_ID,
                t.StartTime,
                t.EndTime,
                t.Label,
                t.IsAvailable
            })
            .ToListAsync();

        return Ok(timetables);
    }

    [HttpPut("EditTime/{slotId}")]
    public async Task<IActionResult> EditTimeSlot(int slotId, [FromBody] Timemodel model)
    {
        var slot = await _context.TimeSlots.FindAsync(slotId);
        if (slot == null)
            return NotFound(new { message = "ไม่พบ Time Slot ที่ต้องการแก้ไข" });

        if (model.StartTime >= model.EndTime)
            return BadRequest(new { message = "เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด" });

        slot.StartTime = model.StartTime;
        slot.EndTime = model.EndTime;
        slot.IsAvailable = model.IsAvailable;
        slot.Label = model.Label ?? $"{model.StartTime:hh\\:mm} - {model.EndTime:hh\\:mm}";

        _context.TimeSlots.Update(slot);
        await _context.SaveChangesAsync();

        return Ok(new { message = "แก้ไขสำเร็จ", slot });
    }

    [HttpPost("AddTime")]
    public async Task<IActionResult> AddTimeSlot([FromBody] Timemodel model)
    {
        if (model.StartTime >= model.EndTime)
            return BadRequest(new { message = "เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด" });

        if (model.Fac_ID <= 0)
            return BadRequest(new { message = "ต้องระบุ Facility" });

        model.Label = model.Label ?? $"{model.StartTime:hh\\:mm} - {model.EndTime:hh\\:mm}";
        _context.TimeSlots.Add(model);
        await _context.SaveChangesAsync();

        return Ok(new { message = "เพิ่ม Time Slot สำเร็จ", model });
    }

    [HttpDelete("DeleteTime/{slotId}")]
    public async Task<IActionResult> DeleteTimeSlot(int slotId)
    {
        var slot = await _context.TimeSlots.FindAsync(slotId);
        if (slot == null)
            return NotFound(new { message = "ไม่พบ Time Slot" });

        _context.TimeSlots.Remove(slot);
        await _context.SaveChangesAsync();

        return Ok(new { message = "ลบ Time Slot เรียบร้อยแล้ว" });
    }

    
}