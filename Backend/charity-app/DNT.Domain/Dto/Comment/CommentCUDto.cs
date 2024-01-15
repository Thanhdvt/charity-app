namespace DNT.Domain
{
    public class CommentCUDto
    {
        public Guid Event_Id { get; set; }

        public string? Text { get; set; }

        public string? Video { get; set; }

        public DateTime Time { get; set; }

        public Status Status { get; set; }

        public string? Picture { get; set; }
    }
}
