using AutoMapper;
using DNT.Domain.Common;

namespace DNT.Domain
{
    public class UserService : BaseService<User, UserDto, UserCUDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly UserSessionState _userSessionState;
        private readonly CharityOrganizationService _charityOrganizationService;

        public UserService(IUserRepository userRepository, UserSessionState userSessionState, IMapper mapper, CharityOrganizationService charityOrganizationService) : base(userRepository, mapper)
        {
            _userRepository = userRepository;
            _userSessionState = userSessionState;
            _charityOrganizationService = charityOrganizationService;
        }

        public async Task<User?> FindByUserName(string userName)
        {
            var user = await _userRepository.FindByUserName(userName);

            return user;
        }

        public async Task<UserDto> GetCurrentUser()
        {
            if (!_userSessionState.Id.HasValue)
            {
                throw new Exception("User is not logged in");
            }

            var user = await _userRepository.GetById(_userSessionState.Id.Value);

            var userDto = _mapper.Map<UserDto>(user);

            if (userDto.Role == Role.Ogranization)
            {
                var charityOrganizationDto = await _charityOrganizationService.GetByUserId(user.Id);

                userDto.CharityOrganization = charityOrganizationDto;
            }

            return userDto;
        }

        public override async Task Update(Guid id, UserCUDto entityCUDto)
        {
            if (!_userSessionState.Id.HasValue)
            {
                throw new Exception("User is not logged in");
            }

            var exits = await _userRepository.GetById(_userSessionState.Id.Value);

            var entity = MapCUDtoToEntity(entityCUDto, id);

            entity.Role = exits.Role;

            if (string.IsNullOrEmpty(entityCUDto.Password))
            {
                entity.Password = exits.Password;
            }

            foreach (var prop in entity.GetType().GetProperties())
            {
                if (prop.GetValue(entity) == null)
                {
                    prop.SetValue(entity, prop.GetValue(exits));
                }
            }

            await _baseRepository.Update(id, entity);

            await _baseRepository.SaveChanges();
        }

        public override User MapCUDtoToEntity(UserCUDto userCUDto)
        {
            var user = _mapper.Map<User>(userCUDto);

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Id = Guid.NewGuid();

            user.Active = true;

            user.Role = Role.User;

            user.Status = Status.initial;

            return user;
        }

        public override User MapCUDtoToEntity(UserCUDto userCUDto, Guid id)
        {
            var user = _mapper.Map<User>(userCUDto);

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Id = id;

            return user;
        }
    }
}
