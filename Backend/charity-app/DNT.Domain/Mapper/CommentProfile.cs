using AutoMapper;

namespace DNT.Domain
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentDto>();
            CreateMap<Comment, CommentCUDto>();
            CreateMap<CommentDto, Comment>();
            CreateMap<CommentCUDto, Comment>();
        }
    }
}
