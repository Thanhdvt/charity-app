namespace DNT.Domain
{
    public class EventCUDto
    {
        public string? Title { get; set; }

        public string? Content { get; set; }

        public string? Image { get; set; }

        public Guid Organization_Id { get; set; }

        public string? Text { get; set; }

        public Status Status { get; set; }

        public DateTime Time { get; set; }

        public string? Review { get; set; }

        public Type Type { get; set; }
    }
}
