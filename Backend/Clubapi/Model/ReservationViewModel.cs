namespace ClubAPI.Models
{
    public class ReservationViewModel
    {
        public int Id { get; set; }
        public int R_id { get; set; }
        public string Fac_Name { get; set; } = string.Empty;
        public DateTime R_Date { get; set; }
        public string R_Time { get; set; } = string.Empty;
        public string R_Status { get; set; } = string.Empty;
        public decimal Pay_Amount { get; set; }
        public string Pay_Status { get; set; } = string.Empty;
    }
}
