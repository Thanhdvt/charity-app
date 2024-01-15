using DNT.Controllers.Base;
using DNT.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharityOrganizationController : BaseController<CharityOrganization, CharityOrganizationDto, CharityOrganizationCUDto>
    {
        public CharityOrganizationController(CharityOrganizationService charityOrganizationService) : base(charityOrganizationService)
        {
        }
    }
}
