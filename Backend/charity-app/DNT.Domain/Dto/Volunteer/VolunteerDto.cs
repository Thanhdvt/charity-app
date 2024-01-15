namespace DNT.Domain
{
    public class VolunteerDto
    {
        public Guid Id { get; set; }

        public Guid User_Id { get; set; }

        public DateTime Support_Time { get; set; }

        public string? Location { get; set; }

        public string? Skills { get; set; }
    }
}
