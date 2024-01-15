namespace DNT.Domain
{
    public class EventDto
    {
        public Guid Id { get; set; }

        public string? Title { get; set; }

        public string? Content { get; set; }

        public string? Image { get; set; }

        public DateTime Created_Date { get; set; }

        public DateTime Modified_Date { get; set; }

        public int Like_Count { get; set; }

        public Guid Organization_Id { get; set; }

        public string? Text { get; set; }

        public int Comment_Count { get; set; }

        public Status Status { get; set; }

        public DateTime Time { get; set; }

        public string? Review { get; set; }

        public Type Type { get; set; }

        public CharityOrganizationDto? CharityOrganization { get; set; }
    }
}
