using AutoMapper;

namespace DNT.Domain
{
    public class CharityOrganizationProfile : Profile
    {
        public CharityOrganizationProfile()
        {
            CreateMap<CharityOrganization, CharityOrganizationDto>();
            CreateMap<CharityOrganization, CharityOrganizationCUDto>();
            CreateMap<CharityOrganizationDto, CharityOrganization>();
            CreateMap<CharityOrganizationCUDto, CharityOrganization>();
        }
    }
}
