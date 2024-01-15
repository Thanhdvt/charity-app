using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class CharityOrganizationRepository : BaseRepository<CharityOrganization>, ICharityOrganizationRepository
    {
        public CharityOrganizationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<CharityOrganization> GetByUserId(Guid id)
        {
            var charityOrganization = await _dbSet.FirstOrDefaultAsync(x => x.User_Id == id);

            if (charityOrganization == null)
            {
                throw new Exception("Người dùng không phải hội thiện nguyện");
            }

            return charityOrganization;
        }
    }
}
