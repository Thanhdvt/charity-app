using AutoMapper;

namespace DNT.Domain
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<User, UserCUDto>();
            CreateMap<UserDto, User>();
            CreateMap<UserCUDto, User>();
        }
    }
}
