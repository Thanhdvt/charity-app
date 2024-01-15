
namespace DNT.Domain
{
    public class ForHelpRequest : IHasKey
    {
        public required Guid Id { get; set; }

        public required string Description { get; set; }

        public required DateTime Date { get; set; }

        public required Status Status { get; set; }

        public required Guid User_id { get; set; }

        public required Guid Organization_Id { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
