using AutoMapper;

namespace DNT.Domain
{
    public class EventRegistProfile : Profile
    {
        public EventRegistProfile()
        {
            CreateMap<EventRegist, EventRegistDto>();
            CreateMap<EventRegist, EventRegistCUDto>();
            CreateMap<EventRegistDto, EventRegist>();
            CreateMap<EventRegistCUDto, EventRegist>();
        }
    }
}
