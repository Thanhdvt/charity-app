
using AutoMapper;
using DNT.Domain.Common;

namespace DNT.Domain
{
    public class EventResponseService : BaseService<EventResponse, EventResponseDto, EventResponseCUDto>
    {
        private readonly UserSessionState _userSessionState;
        private readonly IEventResponseRepository _eventResponseRepository;

        public EventResponseService(IEventResponseRepository eventResponseRepository, UserSessionState userSessionState, IMapper mapper) : base(eventResponseRepository, mapper)
        {
            _userSessionState = userSessionState;
            _eventResponseRepository = eventResponseRepository;
        }

        public async Task<IEnumerable<EventResponseDto>> GetByEventId(Guid eventId)
        {
            var comments = await _eventResponseRepository.FindByEventId(eventId);

            var commentDtos = _mapper.Map<IEnumerable<EventResponseDto>>(comments);

            return commentDtos;
        }

        public override EventResponse MapCUDtoToEntity(EventResponseCUDto entityCUDto)
        {
            var eventResponse = _mapper.Map<EventResponse>(entityCUDto);

            eventResponse.Id = Guid.NewGuid();

            if (_userSessionState.Id.HasValue)
            {
                eventResponse.User_Id = _userSessionState.Id.Value;
            }

            return eventResponse;
        }

        public override EventResponse MapCUDtoToEntity(EventResponseCUDto entityCUDto, Guid id)
        {
            var eventResponse = _mapper.Map<EventResponse>(entityCUDto);

            eventResponse.Id = id;

            if (_userSessionState.Id.HasValue)
            {
                eventResponse.User_Id = _userSessionState.Id.Value;
            }

            return eventResponse;
        }
    }
}
