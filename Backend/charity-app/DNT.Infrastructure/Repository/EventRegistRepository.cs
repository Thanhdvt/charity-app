using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class EventRegistRepository : BaseRepository<EventRegist>, IEventRegistRepository
    {
        public EventRegistRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<EventRegist>> FindByEventId(Guid id)
        {
            var eventRegists = await _dbSet.Where(x => x.Event_Id == id).ToListAsync();

            return eventRegists;
        }

    }
}
