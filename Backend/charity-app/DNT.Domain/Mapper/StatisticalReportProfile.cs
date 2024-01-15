using AutoMapper;

namespace DNT.Domain
{
    public class StatisticalReportProfile : Profile
    {
        public StatisticalReportProfile()
        {
            CreateMap<StatisticalReport, StatisticalReportDto>();
            CreateMap<StatisticalReport, StatisticalReportCUDto>();
            CreateMap<StatisticalReportDto, StatisticalReport>();
            CreateMap<StatisticalReportCUDto, StatisticalReport>();
        }
    }
}
