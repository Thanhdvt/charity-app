namespace DNT.Domain
{
    public interface IEventRepository : IBaseRepository<Event>
    {
        Task<IEnumerable<Event>> GetByOrganizationId(Guid organizationId);
    }
}
