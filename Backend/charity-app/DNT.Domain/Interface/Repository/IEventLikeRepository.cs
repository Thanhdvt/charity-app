namespace DNT.Domain
{
    public interface IEventLikeRepository : IBaseRepository<EventLike>
    {
        Task<IEnumerable<EventLike>> FindByEventId(Guid id);

    }
}
