using AutoMapper;

namespace DNT.Domain.Mapper
{
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Event, EventDto>();
            CreateMap<Event, EventCUDto>();
            CreateMap<EventDto, Event>();
            CreateMap<EventCUDto, Event>();
        }
    }
}
