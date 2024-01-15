using DNT.Controllers.Base;
using DNT.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : BaseController<Comment, CommentDto, CommentCUDto>
    {
        private readonly CommentService _commentService;

        public CommentController(CommentService commentService) : base(commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("event/{eventId}")]
        public async Task<IActionResult> GetByEventId(Guid eventId)
        {
            var comments = await _commentService.GetByEventId(eventId);

            return StatusCode(StatusCodes.Status200OK, comments);
        }
    }
}
