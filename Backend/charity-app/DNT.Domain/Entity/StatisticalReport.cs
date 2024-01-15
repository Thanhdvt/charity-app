using DNT.Domain.Enum;

namespace DNT.Domain
{
    public class StatisticalReport : IHasKey
    {
        public Guid Id { get; set; }

        public Guid Organization_Id { get; set; }

        public TimeUnit Time { get; set; }

        public string? Content { get; set; }

        public DateTime Date { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
