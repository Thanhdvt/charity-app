namespace DNT.Domain
{
    public class CharityOrganizationDto
    {
        public Guid Id { get; set; }

        public Guid User_Id { get; set; }

        public DateTime Establish_Date { get; set; }

        public string? Fax { get; set; }

        public string? Website { get; set; }

        public string? Description { get; set; }
    }
}
