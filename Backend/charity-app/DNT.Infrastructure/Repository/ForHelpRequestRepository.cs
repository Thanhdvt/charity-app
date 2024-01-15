using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure.Repository
{
    public class ForHelpRequestRepository : BaseRepository<ForHelpRequest>, IForHelpRequestRepository
    {
        public ForHelpRequestRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ForHelpRequest>> GetByOrganizationId(Guid organizationId)
        {
            var forHelpRequests = await _dbSet.Where(e => e.Organization_Id == organizationId && e.Status == Status.initial).ToListAsync();

            return forHelpRequests;
        }

        public async Task<IEnumerable<ForHelpRequest>> GetByUserId(Guid userId)
        {
            var forHelpRequests = await _dbSet.Where(e => e.User_id == userId).ToListAsync();

            return forHelpRequests;

        }
    }
}
