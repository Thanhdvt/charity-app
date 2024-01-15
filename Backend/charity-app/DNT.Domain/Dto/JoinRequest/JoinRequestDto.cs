namespace DNT.Domain
{
    public class JoinRequestDto
    {
        public Guid Id { get; set; }

        public Status Status { get; set; } = Status.initial;

        public Guid User_Id { get; set; }

        public string? Support_Time { get; set; }

        public string? Location { get; set; }

        public string? Skills { get; set; }

        public Guid Organization_Id { get; set; }
    }
}
