using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<User?> FindByUserName(string userName)
        {
            var user = await _dbSet.FirstOrDefaultAsync(x => x.UserName == userName);

            return user;
        }

    }
}
