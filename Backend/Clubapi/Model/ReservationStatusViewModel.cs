namespace ClubAPI.Models
{
    public class ReservationStatusViewModel
    {
        public int R_id { get; set; }
        public string Fac_Name { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime R_Date { get; set; }
        public string R_Time { get; set; } = string.Empty;
        public string R_Status { get; set; } = string.Empty;
    }
}
