namespace DNT.Domain
{
    public class IsMember : IHasKey
    {
        public Guid Id { get; set; }

        public Guid Volunteer_Id { get; set; }

        public Guid Organization_Id { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
