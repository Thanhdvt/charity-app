
using AutoMapper;

namespace DNT.Domain
{
    public class StatisticalReportService : BaseService<StatisticalReport, StatisticalReportDto, StatisticalReportCUDto>
    {
        public StatisticalReportService(IStatisticalReportRepository statisticalReportRepository, IMapper mapper) : base(statisticalReportRepository, mapper)
        {
        }

        public override StatisticalReport MapCUDtoToEntity(StatisticalReportCUDto entityCUDto)
        {
            var statisticalReport = _mapper.Map<StatisticalReport>(entityCUDto);

            statisticalReport.Id = Guid.NewGuid();

            return statisticalReport;
        }

        public override StatisticalReport MapCUDtoToEntity(StatisticalReportCUDto entityCUDto, Guid id)
        {
            var statisticalReport = _mapper.Map<StatisticalReport>(entityCUDto);

            statisticalReport.Id = id;

            return statisticalReport;
        }
    }
}
