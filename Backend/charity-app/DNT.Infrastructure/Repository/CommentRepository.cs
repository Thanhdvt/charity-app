using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure.Repository
{
    public class CommentRepository : BaseRepository<Comment>, ICommentRepository
    {
        public CommentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Comment>> FindByEventId(Guid id)
        {
            var eventRegists = await _dbSet.Where(x => x.Event_Id == id).ToListAsync();

            return eventRegists;
        }
    }
}
