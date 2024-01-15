namespace DNT.Domain
{
    public interface ICharityOrganizationRepository : IBaseRepository<CharityOrganization>
    {
        Task<CharityOrganization> GetByUserId(Guid id);
    }
}
