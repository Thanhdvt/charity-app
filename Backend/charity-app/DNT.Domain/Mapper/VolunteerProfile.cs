using AutoMapper;

namespace DNT.Domain.Mapper
{
    public class VolunteerProfile : Profile
    {
        public VolunteerProfile()
        {
            CreateMap<Volunteer, VolunteerDto>();
            CreateMap<Volunteer, VolunteerCUDto>();
            CreateMap<VolunteerDto, Volunteer>();
            CreateMap<VolunteerCUDto, Volunteer>();
        }
    }
}
