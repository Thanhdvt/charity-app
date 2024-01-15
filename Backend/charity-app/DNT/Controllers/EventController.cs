using DNT.Controllers.Base;
using DNT.Domain;
using DNT.Domain.Service;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : BaseController<Event, EventDto, EventCUDto>
    {
        private readonly EventService _eventService;

        public EventController(EventService eventService) : base(eventService)
        {
            _eventService = eventService;
        }

        [HttpGet("organization/{organizationId}")]
        public async Task<IActionResult> GetByOrganizationId(Guid organizationId)
        {
            var eventDtos = await _eventService.GetByOrganizationId(organizationId);

            return StatusCode(StatusCodes.Status200OK, eventDtos);
        }

        public override async Task<IActionResult> Create([FromBody] EventCUDto entityCUDto)
        {
            var id = await _eventService.CreateReturnId(entityCUDto);

            return StatusCode(StatusCodes.Status200OK, id);
        }
    }
}
