namespace DNT.Domain
{
    public interface IHasKey
    {
        public Guid Id { get; set; }
        public Guid GetKey();
    }
}
