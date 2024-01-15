
using AutoMapper;
using DNT.Domain.Common;

namespace DNT.Domain
{
    public class JoinRequestService : BaseService<JoinRequest, JoinRequestDto, JoinRequestCUDto>
    {
        private readonly UserSessionState _userSessionState;
        private readonly IJoinRequestRepository _joinRequestRepository;
        private readonly IVolunteerRepository _volunteerRepository;
        private readonly IIsMemberRepository _isMemberRepository;

        public JoinRequestService(IJoinRequestRepository joinRequestRepository, UserSessionState userSessionState, IMapper mapper, IVolunteerRepository volunteerRepository, IIsMemberRepository isMemberRepository) : base(joinRequestRepository, mapper)
        {
            _userSessionState = userSessionState;
            _joinRequestRepository = joinRequestRepository;
            _volunteerRepository = volunteerRepository;
            _isMemberRepository = isMemberRepository;
        }

        public async Task AppoveJoinRequest(Guid id)
        {
            var request = await _joinRequestRepository.GetById(id);

            if (request.Status == Status.approved)
            {
                throw new Exception("Yêu cầu đã được xác nhận");
            }

            request.Status = Status.approved;
            await _joinRequestRepository.Update(id, request);

            var volunteer = await _volunteerRepository.GetByUserId(request.User_Id);

            if (volunteer == null)
            {
                throw new Exception("Người dùng không phải tình nguyện viên");
            }

            await _isMemberRepository.Create(new IsMember { Id = Guid.NewGuid(), Organization_Id = request.Organization_Id, Volunteer_Id = volunteer.Id });

            await _baseRepository.SaveChanges();
        }

        public async Task<IEnumerable<JoinRequestDto>> GetByUserId(Guid userId)
        {
            var forHelpRequests = await _joinRequestRepository.GetByUserId(userId);

            var forHelpRequestsDtos = _mapper.Map<IEnumerable<JoinRequestDto>>(forHelpRequests);

            return forHelpRequestsDtos;
        }

        public async Task<IEnumerable<JoinRequestDto>> GetByOrganization_Id(Guid organizationId)
        {
            var request = await _joinRequestRepository.GetByOrganization_Id(organizationId);

            var joinRequestDtos = _mapper.Map<IEnumerable<JoinRequestDto>>(request);

            return joinRequestDtos;
        }

        public override JoinRequest MapCUDtoToEntity(JoinRequestCUDto entityCUDto)
        {
            var joinRequest = _mapper.Map<JoinRequest>(entityCUDto);

            joinRequest.Id = Guid.NewGuid();
            joinRequest.Status = Status.initial;

            if (_userSessionState.Id.HasValue)
            {
                joinRequest.User_Id = _userSessionState.Id.Value;
            }

            return joinRequest;
        }

        public override JoinRequest MapCUDtoToEntity(JoinRequestCUDto entityCUDto, Guid id)
        {
            var joinRequest = _mapper.Map<JoinRequest>(entityCUDto);

            joinRequest.Id = id;

            if (_userSessionState.Id.HasValue)
            {
                joinRequest.User_Id = _userSessionState.Id.Value;
            }

            return joinRequest;
        }
    }
}
