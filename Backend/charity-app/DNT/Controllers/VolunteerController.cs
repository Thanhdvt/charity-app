using DNT.Controllers.Base;
using DNT.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteerController : BaseController<Volunteer, VolunteerDto, VolunteerCUDto>
    {
        private readonly VolunteerService _volunteerService;
        public VolunteerController(VolunteerService volunteerService) : base(volunteerService)
        {
            _volunteerService = volunteerService;
        }

        [HttpGet("organization/{organizationId}")]
        public async Task<IActionResult> GetByOrganizationId(Guid organizationId)
        {
            var volunteers = await _volunteerService.GetByOrganizationId(organizationId);

            return StatusCode(StatusCodes.Status200OK, volunteers);
        }
    }
}
