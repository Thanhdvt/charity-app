namespace DNT.Domain
{
    public class Volunteer : IHasKey
    {
        public Guid Id { get; set; }

        public Guid User_Id { get; set; }

        public DateTime Support_Time { get; set; }

        public string? Location { get; set; }

        public string? Skills { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
