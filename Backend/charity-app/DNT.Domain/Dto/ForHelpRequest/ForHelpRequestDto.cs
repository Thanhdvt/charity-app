namespace DNT.Domain
{
    public class ForHelpRequestDto
    {
        public required Guid Id { get; set; }

        public required string Description { get; set; }

        public required DateTime Date { get; set; }

        public required Status Status { get; set; }

        public required string User_id { get; set; }

        public required string Organization_Id { get; set; }
    }
}
