namespace DNT.Domain
{
    public class EventResponseDto
    {
        public Guid Id { get; set; }

        public Guid User_Id { get; set; }

        public Guid Event_Id { get; set; }

        public string? Response_Content { get; set; }
    }
}
