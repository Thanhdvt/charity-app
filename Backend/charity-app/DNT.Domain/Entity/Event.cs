
namespace DNT.Domain
{
    public class Event : IHasKey
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }

        public required string Content { get; set; }

        public required string Image { get; set; }

        public required DateTime Created_Date { get; set; }

        public required DateTime Modified_Date { get; set; }

        public required int Like_Count { get; set; }

        public required Guid Organization_Id { get; set; }

        public required string Text { get; set; }

        public required int Comment_Count { get; set; }

        public required Status Status { get; set; }

        public required DateTime Time { get; set; }

        public required string Review { get; set; }

        public required Type Type { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
