namespace DNT.Domain
{
    public interface IEventResponseRepository : IBaseRepository<EventResponse>
    {
        Task<IEnumerable<EventResponse>> FindByEventId(Guid id);

    }
}
