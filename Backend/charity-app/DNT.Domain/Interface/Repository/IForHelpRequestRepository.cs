namespace DNT.Domain
{
    public interface IForHelpRequestRepository : IBaseRepository<ForHelpRequest>
    {
        Task<IEnumerable<ForHelpRequest>> GetByOrganizationId(Guid organizationId);

        Task<IEnumerable<ForHelpRequest>> GetByUserId(Guid userId);
    }
}
