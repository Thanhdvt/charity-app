using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure.Repository
{
    public class EventRepository : BaseRepository<Event>, IEventRepository
    {
        public EventRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Event>> GetByOrganizationId(Guid organizationId)
        {
            var events = await _dbSet.Where(e => e.Organization_Id == organizationId).ToListAsync();

            return events;
        }
    }
}
