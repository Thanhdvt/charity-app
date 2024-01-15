using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class VolunteerRepository : BaseRepository<Volunteer>, IVolunteerRepository
    {
        public VolunteerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Volunteer> GetByUserId(Guid id)
        {
            var volunteer = await _dbSet.FirstOrDefaultAsync(x => x.User_Id == id);

            if (volunteer == null)
            {
                throw new Exception("Người dùng không phải tình nguyện viên");
            }

            return volunteer;
        }

    }
}
