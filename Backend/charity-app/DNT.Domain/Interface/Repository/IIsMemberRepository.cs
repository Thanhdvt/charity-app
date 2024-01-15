namespace DNT.Domain
{
    public interface IIsMemberRepository : IBaseRepository<IsMember>
    {
        /// <summary>
        /// </summary>
        /// <param name="organizationId"></param>
        /// <returns></returns>
        Task<IEnumerable<IsMember>> GetByOrganizationId(Guid organizationId);
    }
}
