using DNT.Controllers.Base;
using DNT.Domain;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticalReportController : BaseController<StatisticalReport, StatisticalReportDto, StatisticalReportCUDto>
    {
        public StatisticalReportController(StatisticalReportService statisticalReportService) : base(statisticalReportService)
        {
        }
    }
}
