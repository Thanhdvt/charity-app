namespace DNT.Domain.Common
{
    /// <summary>
    /// Quản lý thông tin user mỗi session
    /// </summary>
    public class UserSessionState
    {
        public string? Name { get; set; }

        public Guid? Id { get; set; }
    }
}
