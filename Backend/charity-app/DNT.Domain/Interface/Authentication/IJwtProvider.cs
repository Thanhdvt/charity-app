namespace DNT.Domain
{
    public interface IJwtProvider
    {
        public string Generate(User user);

    }
}
