using AutoMapper;

namespace DNT.Domain
{
    public class ForHelpRequestProfile : Profile
    {
        public ForHelpRequestProfile()
        {
            CreateMap<ForHelpRequest, ForHelpRequestDto>();
            CreateMap<ForHelpRequest, ForHelpRequestCUDto>();
            CreateMap<ForHelpRequestDto, ForHelpRequest>();
            CreateMap<ForHelpRequestCUDto, ForHelpRequest>();
        }
    }
}
