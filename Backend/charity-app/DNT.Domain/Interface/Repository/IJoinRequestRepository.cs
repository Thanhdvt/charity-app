namespace DNT.Domain
{
    public interface IJoinRequestRepository : IBaseRepository<JoinRequest>
    {
        /// <summary>
        /// Lấy danh sách yêu cầu theo hội
        /// </summary>
        /// <param name="Organization_Id"></param>
        /// <returns></returns>
        Task<IEnumerable<JoinRequest>> GetByOrganization_Id(Guid Organization_Id);

        Task<IEnumerable<JoinRequest>> GetByUserId(Guid userId);

    }
}
