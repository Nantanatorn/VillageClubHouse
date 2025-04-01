namespace ClubAPI.Models
{
    public class PaymentViewModel
    {
        public int Pay_ID { get; set; }

        public string Fac_Name { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public DateTime Pay_Date { get; set; }

        public decimal Pay_Amount { get; set; }

        public string Pay_Method { get; set; } = string.Empty;

        public string Pay_Status { get; set; } = string.Empty;
    }
}
