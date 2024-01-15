namespace DNT.Domain
{
    public class EventLikeDto
    {
        public Guid Id { get; set; }

        public Guid Event_Id { get; set; }

        public Guid User_Id { get; set; }

        public Status Status { get; set; }

        public DateTime Time { get; set; }

        public int? Upvote { get; set; }
    }
}
