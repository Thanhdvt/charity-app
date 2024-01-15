using AutoMapper;

namespace DNT.Domain.Mapper
{
    public class EventResponseProfile : Profile
    {
        public EventResponseProfile()
        {
            CreateMap<EventResponse, EventResponseDto>();
            CreateMap<EventResponse, EventResponseCUDto>();
            CreateMap<EventResponseDto, EventResponse>();
            CreateMap<EventResponseCUDto, EventResponse>();
        }
    }
}
