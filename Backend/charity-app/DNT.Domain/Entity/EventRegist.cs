namespace DNT.Domain
{
    public class EventRegist : IHasKey
    {
        public Guid Id { get; set; }

        public Guid Event_Id { get; set; }

        public Guid Volunteer_Id { get; set; }

        public Guid GetKey()
        {
            return Id;
        }
    }
}
