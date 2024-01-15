
using AutoMapper;
using DNT.Domain.Common;

namespace DNT.Domain
{
    public class CharityOrganizationService : BaseService<CharityOrganization, CharityOrganizationDto, CharityOrganizationCUDto>
    {
        private readonly UserSessionState _userSessionState;

        private readonly ICharityOrganizationRepository _charityOrganizationRepository;

        public CharityOrganizationService(ICharityOrganizationRepository charityOrganizationRepository, UserSessionState userSessionState, IMapper mapper) : base(charityOrganizationRepository, mapper)
        {
            _userSessionState = userSessionState;
            _charityOrganizationRepository = charityOrganizationRepository;
        }

        public async Task<CharityOrganizationDto> GetByUserId(Guid id)
        {
            var charityOrganization = await _charityOrganizationRepository.GetByUserId(id);

            var charityOrganizationDto = _mapper.Map<CharityOrganizationDto>(charityOrganization);

            return charityOrganizationDto;
        }

        public override CharityOrganization MapCUDtoToEntity(CharityOrganizationCUDto entityCUDto)
        {
            var charityOrganization = _mapper.Map<CharityOrganization>(entityCUDto);

            charityOrganization.Id = Guid.NewGuid();

            if (_userSessionState.Id.HasValue)
            {
                charityOrganization.User_Id = _userSessionState.Id.Value;
            }

            return charityOrganization;
        }

        public override CharityOrganization MapCUDtoToEntity(CharityOrganizationCUDto entityCUDto, Guid id)
        {
            var charityOrganization = _mapper.Map<CharityOrganization>(entityCUDto);

            charityOrganization.Id = id;

            if (_userSessionState.Id.HasValue)
            {
                charityOrganization.User_Id = _userSessionState.Id.Value;
            }

            return charityOrganization;
        }
    }
}
