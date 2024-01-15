using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class EventLikeRepository : BaseRepository<EventLike>, IEventLikeRepository
    {
        public EventLikeRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<EventLike>> FindByEventId(Guid id)
        {
            var eventRegists = await _dbSet.Where(x => x.Event_Id == id).ToListAsync();

            return eventRegists;
        }
    }
}
