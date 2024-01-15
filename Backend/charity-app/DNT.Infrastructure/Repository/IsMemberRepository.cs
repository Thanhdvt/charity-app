using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class IsMemberRepository : BaseRepository<IsMember>, IIsMemberRepository
    {
        public IsMemberRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<IsMember>> GetByOrganizationId(Guid organizationId)
        {
            var isMembers = await _dbSet.Where(x => x.Organization_Id == organizationId).ToListAsync();

            return isMembers;
        }
    }
}
