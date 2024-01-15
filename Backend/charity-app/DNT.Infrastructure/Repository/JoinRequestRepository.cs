using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class JoinRequestRepository : BaseRepository<JoinRequest>, IJoinRequestRepository
    {
        public JoinRequestRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<JoinRequest>> GetByOrganization_Id(Guid Organization_Id)
        {
            var request = await _dbSet.Where(x => x.Organization_Id == Organization_Id && x.Status == Status.initial).ToListAsync();

            return request;
        }

        public async Task<IEnumerable<JoinRequest>> GetByUserId(Guid userId)
        {
            var request = await _dbSet.Where(x => x.User_Id == userId && x.Status == Status.initial).ToListAsync();

            return request;
        }

        public override async Task<IEnumerable<JoinRequest>> GetAll()
        {
            var request = await _dbSet.Where(x => x.Status == Status.initial).ToListAsync();

            return request;
        }
    }
}
