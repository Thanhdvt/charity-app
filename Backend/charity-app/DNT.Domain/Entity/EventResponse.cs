namespace DNT.Domain
{
    public class EventResponse : IHasKey
    {
        public Guid Id { get; set; }

        public Guid User_Id { get; set; }

        public Guid Event_Id { get; set; }

        public string? Response_Content { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
