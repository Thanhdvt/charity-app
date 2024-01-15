using AutoMapper;

namespace DNT.Domain.Service
{
    public class EventService : BaseService<Event, EventDto, EventCUDto>
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository, IMapper mapper) : base(eventRepository, mapper)
        {
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<EventDto>> GetByOrganizationId(Guid organizationId)
        {
            var events = await _eventRepository.GetByOrganizationId(organizationId);

            var eventDtos = _mapper.Map<IEnumerable<EventDto>>(events);

            return eventDtos;
        }

        public async Task<Guid> CreateReturnId(EventCUDto entityCUDto)
        {
            var entity = MapCUDtoToEntity(entityCUDto);

            await _baseRepository.Create(entity);

            await _baseRepository.SaveChanges();

            return entity.Id;
        }

        public override Event MapCUDtoToEntity(EventCUDto entityCUDto)
        {
            var eventEntity = _mapper.Map<Event>(entityCUDto);

            eventEntity.Id = Guid.NewGuid();

            eventEntity.Created_Date = DateTime.Now;

            eventEntity.Modified_Date = DateTime.Now;

            return eventEntity;
        }

        public override Event MapCUDtoToEntity(EventCUDto entityCUDto, Guid id)
        {
            var eventEntity = _mapper.Map<Event>(entityCUDto);

            eventEntity.Id = id;

            eventEntity.Modified_Date = DateTime.Now;

            return eventEntity;
        }
    }
}
