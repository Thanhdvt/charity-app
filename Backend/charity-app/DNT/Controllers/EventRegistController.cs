using DNT.Controllers.Base;
using DNT.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventRegistController : BaseController<EventRegist, EventRegistDto, EventRegistCUDto>
    {
        private readonly EventRegistService _eventRegistService;

        public EventRegistController(EventRegistService eventRegistService) : base(eventRegistService)
        {
            _eventRegistService = eventRegistService;
        }

        [HttpGet("count/{id}")]
        public async Task<IActionResult> CountRegisterByEventId(Guid id)
        {
            var count = await _eventRegistService.CountRegisterByEventId(id);

            return StatusCode(StatusCodes.Status200OK, count);
        }


        [HttpGet("event/{eventId}")]
        public async Task<IActionResult> GetByEventId(Guid eventId)
        {
            var comments = await _eventRegistService.GetByEventId(eventId);

            return StatusCode(StatusCodes.Status200OK, comments);
        }
    }
}
