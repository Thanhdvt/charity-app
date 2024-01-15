namespace DNT.Domain
{
    public interface IVolunteerRepository : IBaseRepository<Volunteer>
    {
        Task<Volunteer> GetByUserId(Guid id);
    }
}
