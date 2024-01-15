namespace DNT.Domain
{
    public interface ICommentRepository : IBaseRepository<Comment>
    {
        Task<IEnumerable<Comment>> FindByEventId(Guid id);

    }
}
