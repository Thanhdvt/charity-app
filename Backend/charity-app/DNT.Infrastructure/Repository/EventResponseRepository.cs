using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class EventResponseRepository : BaseRepository<EventResponse>, IEventResponseRepository
    {
        public EventResponseRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<EventResponse>> FindByEventId(Guid id)
        {
            var eventRegists = await _dbSet.Where(x => x.Event_Id == id).ToListAsync();

            return eventRegists;
        }
    }
}
