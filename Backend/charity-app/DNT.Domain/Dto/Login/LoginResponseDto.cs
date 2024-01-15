namespace DNT.Domain
{
    public class LoginResponseDto
    {
        public required string Token { get; set; }

        public required UserDto User { get; set; }

        public CharityOrganizationDto? CharityOrganization { get; set; }
    }
}
