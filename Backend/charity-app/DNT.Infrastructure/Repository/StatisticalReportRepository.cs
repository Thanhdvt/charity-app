using DNT.Domain;

namespace DNT.Infrastructure
{
    public class StatisticalReportRepository : BaseRepository<StatisticalReport>, IStatisticalReportRepository
    {
        public StatisticalReportRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
