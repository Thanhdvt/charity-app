using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }

        public DbSet<ForHelpRequest> ForHelpRequest { get; set; }

        public DbSet<Event> Event { get; set; }

        public DbSet<Comment> Comment { get; set; }

        public DbSet<EventLike> EventLike { get; set; }

        public DbSet<Volunteer> Volunteer { get; set; }

        public DbSet<EventRegist> EventRegist { get; set; }

        public DbSet<CharityOrganization> CharityOrganization { get; set; }

        public DbSet<JoinRequest> JoinRequest { get; set; }

        public DbSet<IsMember> IsMember { get; set; }

        public DbSet<StatisticalReport> StatisticalReport { get; set; }

        public DbSet<EventResponse> EventResponse { get; set; }
    }
}
