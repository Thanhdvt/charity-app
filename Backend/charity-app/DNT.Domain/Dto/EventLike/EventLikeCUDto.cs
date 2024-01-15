namespace DNT.Domain
{
    public class EventLikeCUDto
    {
        public Guid Event_Id { get; set; }

        public Status Status { get; set; }

        public DateTime Time { get; set; }

        public int? Upvote { get; set; }
    }
}
