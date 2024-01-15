
using AutoMapper;
using DNT.Domain.Common;

namespace DNT.Domain
{
    public class CommentService : BaseService<Comment, CommentDto, CommentCUDto>
    {
        private readonly UserSessionState _userSessionState;
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository, IMapper mapper, UserSessionState userSessionState) : base(commentRepository, mapper)
        {
            _userSessionState = userSessionState;
            _commentRepository = commentRepository;
        }

        public async Task<IEnumerable<CommentDto>> GetByEventId(Guid eventId)
        {
            var comments = await _commentRepository.FindByEventId(eventId);

            var commentDtos = _mapper.Map<IEnumerable<CommentDto>>(comments);

            return commentDtos;
        }

        public override Comment MapCUDtoToEntity(CommentCUDto entityCUDto)
        {
            var comment = _mapper.Map<Comment>(entityCUDto);

            comment.Id = Guid.NewGuid();

            if (_userSessionState.Id.HasValue)
            {
                comment.User_Id = _userSessionState.Id.Value;
            }

            return comment;
        }

        public override Comment MapCUDtoToEntity(CommentCUDto entityCUDto, Guid id)
        {
            var comment = _mapper.Map<Comment>(entityCUDto);
            comment.Id = id;

            if (_userSessionState.Id.HasValue)
            {
                comment.User_Id = _userSessionState.Id.Value;
            }

            return comment;
        }
    }
}
