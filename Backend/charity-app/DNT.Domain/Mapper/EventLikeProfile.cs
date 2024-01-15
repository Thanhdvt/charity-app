using AutoMapper;

namespace DNT.Domain
{
    public class EventLikeProfile : Profile
    {
        public EventLikeProfile()
        {
            CreateMap<EventLike, EventLikeDto>();
            CreateMap<EventLike, EventLikeCUDto>();
            CreateMap<EventLikeDto, EventLike>();
            CreateMap<EventLikeCUDto, EventLike>();
        }
    }
}
