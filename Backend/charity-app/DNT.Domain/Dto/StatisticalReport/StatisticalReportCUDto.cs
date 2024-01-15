using DNT.Domain.Enum;

namespace DNT.Domain
{
    public class StatisticalReportCUDto
    {
        public Guid Organization_Id { get; set; }

        public TimeUnit Time { get; set; }

        public string? Content { get; set; }

        public DateTime Date { get; set; }
    }
}
