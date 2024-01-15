
using AutoMapper;
using DNT.Domain.Common;

namespace DNT.Domain
{
    public class EventLikeService : BaseService<EventLike, EventLikeDto, EventLikeCUDto>
    {
        private readonly UserSessionState _userSessionState;
        private readonly IEventLikeRepository _eventLikeRepository;

        public EventLikeService(IEventLikeRepository eventLikeRepository, UserSessionState userSessionState, IMapper mapper) : base(eventLikeRepository, mapper)
        {
            _userSessionState = userSessionState;
            _eventLikeRepository = eventLikeRepository;
        }

        public async Task<IEnumerable<EventLikeDto>> GetByEventId(Guid eventId)
        {
            var comments = await _eventLikeRepository.FindByEventId(eventId);

            var commentDtos = _mapper.Map<IEnumerable<EventLikeDto>>(comments);

            return commentDtos;
        }

        public override EventLike MapCUDtoToEntity(EventLikeCUDto entityCUDto)
        {
            var eventLike = _mapper.Map<EventLike>(entityCUDto);

            eventLike.Id = Guid.NewGuid();

            if (_userSessionState.Id.HasValue)
            {
                eventLike.User_Id = _userSessionState.Id.Value;
            }

            return eventLike;
        }

        public override EventLike MapCUDtoToEntity(EventLikeCUDto entityCUDto, Guid id)
        {
            var eventLike = _mapper.Map<EventLike>(entityCUDto);
            eventLike.Id = id;

            if (_userSessionState.Id.HasValue)
            {
                eventLike.User_Id = _userSessionState.Id.Value;
            }

            return eventLike;
        }
    }
}
