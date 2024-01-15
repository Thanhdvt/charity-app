using AutoMapper;

namespace DNT.Domain.Service
{
    public class ForHelpRequestService : BaseService<ForHelpRequest, ForHelpRequestDto, ForHelpRequestCUDto>
    {
        private readonly IForHelpRequestRepository _forHelpRequestRepository;

        public ForHelpRequestService(IForHelpRequestRepository forHelpRequestRepository, IMapper mapper) : base(forHelpRequestRepository, mapper)
        {
            _forHelpRequestRepository = forHelpRequestRepository;
        }

        public async Task<IEnumerable<ForHelpRequestDto>> GetByUserId(Guid userId)
        {
            var forHelpRequests = await _forHelpRequestRepository.GetByUserId(userId);

            var forHelpRequestsDtos = _mapper.Map<IEnumerable<ForHelpRequestDto>>(forHelpRequests);

            return forHelpRequestsDtos;
        }

        public async Task<Guid> CreateReturnId(ForHelpRequestCUDto entityCUDto)
        {
            var entity = MapCUDtoToEntity(entityCUDto);

            await _baseRepository.Create(entity);

            await _baseRepository.SaveChanges();

            return entity.Id;
        }

        public async Task<IEnumerable<ForHelpRequestDto>> GetByOrganizationId(Guid organizationId)
        {
            var forHelpRequests = await _forHelpRequestRepository.GetByOrganizationId(organizationId);

            var forHelpRequestsDtos = _mapper.Map<IEnumerable<ForHelpRequestDto>>(forHelpRequests);

            return forHelpRequestsDtos;
        }

        public async Task Action(Guid id, bool approved)
        {
            var forHelpRequest = await _forHelpRequestRepository.GetById(id);

            if (approved)
            {
                forHelpRequest.Status = Status.approved;
            }
            else
            {
                forHelpRequest.Status = Status.rejected;
            }

            await _forHelpRequestRepository.Update(id, forHelpRequest);

            await _forHelpRequestRepository.SaveChanges();
        }

        public override ForHelpRequest MapCUDtoToEntity(ForHelpRequestCUDto entityCUDto)
        {
            var forHelpRequest = _mapper.Map<ForHelpRequest>(entityCUDto);

            forHelpRequest.User_id = Guid.Parse(entityCUDto.User_id);
            forHelpRequest.Organization_Id = Guid.Parse(entityCUDto.Organization_Id);

            forHelpRequest.Id = Guid.NewGuid();

            return forHelpRequest;
        }

        public override ForHelpRequest MapCUDtoToEntity(ForHelpRequestCUDto entityCUDto, Guid id)
        {
            var forHelpRequest = _mapper.Map<ForHelpRequest>(entityCUDto);

            forHelpRequest.User_id = Guid.Parse(entityCUDto.User_id);
            forHelpRequest.Organization_Id = Guid.Parse(entityCUDto.Organization_Id);

            forHelpRequest.Id = id;

            return forHelpRequest;
        }
    }
}
