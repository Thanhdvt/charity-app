
namespace DNT.Domain
{
    public class LoginService
    {
        private readonly IJwtProvider _jwtProvider;
        private readonly UserService _userService;
        private readonly CharityOrganizationService _charityOrganizationService;

        public LoginService(IJwtProvider jwtProvider, UserService userService, CharityOrganizationService charityOrganizationService)
        {
            _jwtProvider = jwtProvider;
            _userService = userService;
            _charityOrganizationService = charityOrganizationService;
        }

        public async Task<LoginResponseDto> Login(LoginDto loginDto)
        {
            var user = await _userService.FindByUserName(loginDto.UserName);

            if (user == null)
            {
                throw new Exception("user not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                throw new Exception("wrong password");
            }

            var token = _jwtProvider.Generate(user);

            var userDto = await _userService.GetById(user.Id);

            var loginResponseDto = new LoginResponseDto
            {
                Token = token,
                User = userDto,
            };

            if (userDto.Role == Role.Ogranization)
            {
                var charityOrganizationDto = await _charityOrganizationService.GetByUserId(user.Id);

                loginResponseDto.CharityOrganization = charityOrganizationDto;
            }

            return loginResponseDto;
        }
    }
}
