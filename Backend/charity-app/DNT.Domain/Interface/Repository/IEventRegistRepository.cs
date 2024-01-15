namespace DNT.Domain
{
    public interface IEventRegistRepository : IBaseRepository<EventRegist>
    {
        Task<IEnumerable<EventRegist>> FindByEventId(Guid id);
    }
}
