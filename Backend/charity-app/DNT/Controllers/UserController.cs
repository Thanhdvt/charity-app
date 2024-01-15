using DNT.Controllers.Base;
using DNT.Domain;
using Microsoft.AspNetCore.Mvc;

namespace DNT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<User, UserDto, UserCUDto>
    {
        private readonly UserService _userService;

        public UserController(UserService userService) : base(userService)
        {
            _userService = userService;
        }

        [HttpGet("infor")]
        public async Task<IActionResult> Get()
        {
            var user = await _userService.GetCurrentUser();

            return StatusCode(StatusCodes.Status200OK, user);
        }
    }
}
