using DNT.Controllers.Base;
using DNT.Domain;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventResponseController : BaseController<EventResponse, EventResponseDto, EventResponseCUDto>
    {
        private readonly EventResponseService _eventResponseService;
        public EventResponseController(EventResponseService eventResponseService) : base(eventResponseService)
        {
            _eventResponseService = eventResponseService;
        }

        [HttpGet("event/{eventId}")]
        public async Task<IActionResult> GetByEventId(Guid eventId)
        {
            var comments = await _eventResponseService.GetByEventId(eventId);

            return StatusCode(StatusCodes.Status200OK, comments);
        }
    }
}
