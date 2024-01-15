namespace DNT.Domain
{
    public class EventLike : IHasKey
    {
        public Guid Id { get; set; }

        public Guid Event_Id { get; set; }

        public Guid User_Id { get; set; }

        public Status Status { get; set; }

        public DateTime Time { get; set; }

        public int? Upvote { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
