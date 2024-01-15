using DNT.Controllers.Base;
using DNT.Domain;
using DNT.Domain.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForHelpRequestController : BaseController<ForHelpRequest, ForHelpRequestDto, ForHelpRequestCUDto>
    {
        private readonly ForHelpRequestService _forHelpRequestService;

        public ForHelpRequestController(ForHelpRequestService forHelpRequestService) : base(forHelpRequestService)
        {
            _forHelpRequestService = forHelpRequestService;
        }

        [HttpGet("organization/{organizationId}")]
        public async Task<IActionResult> GetByOrganizationId(Guid organizationId)
        {
            var forHelpRequestDtos = await _forHelpRequestService.GetByOrganizationId(organizationId);

            return StatusCode(StatusCodes.Status200OK, forHelpRequestDtos);
        }

        [HttpPost("action/{id}")]
        public async Task<IActionResult> Action(Guid id, [FromQuery] bool approved)
        {
            await _forHelpRequestService.Action(id, approved);

            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPost("user/{userId}")]
        public async Task<IActionResult> GetByUserId(Guid userId)
        {
            var forHelpRequestDtos = await _forHelpRequestService.GetByUserId(userId);

            return StatusCode(StatusCodes.Status200OK, forHelpRequestDtos);
        }

        public override async Task<IActionResult> Create([FromBody] ForHelpRequestCUDto entityCUDto)
        {
            var id = await _forHelpRequestService.CreateReturnId(entityCUDto);

            return StatusCode(StatusCodes.Status200OK, id);
        }
    }
}
