
using AutoMapper;
using DNT.Domain.Common;

namespace DNT.Domain
{
    public class VolunteerService : BaseService<Volunteer, VolunteerDto, VolunteerCUDto>
    {
        private readonly UserSessionState _userSessionState;
        private readonly IVolunteerRepository _volunteerRepository;
        private readonly IIsMemberRepository _isMemberRepository;

        public VolunteerService(IVolunteerRepository volunteerRepository, IIsMemberRepository isMemberRepository, IMapper mapper, UserSessionState userSessionState) : base(volunteerRepository, mapper)
        {
            _userSessionState = userSessionState;
            _volunteerRepository = volunteerRepository;
            _isMemberRepository = isMemberRepository;
        }

        public async Task<IEnumerable<VolunteerDto>> GetByOrganizationId(Guid organizationId)
        {
            var isMember = await _isMemberRepository.GetByOrganizationId(organizationId);
            var volunteerIds = isMember.Select(x => x.Volunteer_Id).ToList();
            var volunteers = await _volunteerRepository.GetByListIds(volunteerIds);

            return volunteers.Select(x => _mapper.Map<VolunteerDto>(x));
        }

        public override Volunteer MapCUDtoToEntity(VolunteerCUDto entityCUDto)
        {
            var volunteer = _mapper.Map<Volunteer>(entityCUDto);

            volunteer.Id = Guid.NewGuid();

            if (_userSessionState.Id.HasValue)
            {
                volunteer.User_Id = _userSessionState.Id.Value;
            }

            return volunteer;
        }

        public override Volunteer MapCUDtoToEntity(VolunteerCUDto entityCUDto, Guid id)
        {
            var volunteer = _mapper.Map<Volunteer>(entityCUDto);
            volunteer.Id = id;

            if (_userSessionState.Id.HasValue)
            {
                volunteer.User_Id = _userSessionState.Id.Value;
            }

            return volunteer;
        }
    }
}
