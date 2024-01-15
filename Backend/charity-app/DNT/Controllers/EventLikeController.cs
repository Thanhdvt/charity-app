using DNT.Controllers.Base;
using DNT.Domain;
using DNT.Domain.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventLikeController : BaseController<EventLike, EventLikeDto, EventLikeCUDto>
    {
        private readonly EventLikeService _eventLikeService;
        public EventLikeController(EventLikeService eventLikeService) : base(eventLikeService)
        {
            _eventLikeService = eventLikeService;
        }

        [HttpGet("event/{eventId}")]
        public async Task<IActionResult> GetByEventId(Guid eventId)
        {
            var comments = await _eventLikeService.GetByEventId(eventId);

            return StatusCode(StatusCodes.Status200OK, comments);
        }
    }
}
