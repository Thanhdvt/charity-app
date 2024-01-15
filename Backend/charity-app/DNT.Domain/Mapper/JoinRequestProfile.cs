using AutoMapper;

namespace DNT.Domain
{
    public class JoinRequestProfile : Profile
    {
        public JoinRequestProfile()
        {
            CreateMap<JoinRequest, JoinRequestDto>();
            CreateMap<JoinRequest, JoinRequestCUDto>();
            CreateMap<JoinRequestDto, JoinRequest>();
            CreateMap<JoinRequestCUDto, JoinRequest>();
        }
    }
}
