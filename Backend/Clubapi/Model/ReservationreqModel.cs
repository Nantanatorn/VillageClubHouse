public class ReservationreqModel
{
    public int Fac_ID { get; set; }                   // 🏛️ จากการ์ด
    public DateTime R_Date { get; set; }              // 📅 จาก datepicker
    public string R_Time { get; set; } = string.Empty; // 🕒 จาก radio label
    public int R_Duration { get; set; } = 1;          // ⏱️ default = 1

}
