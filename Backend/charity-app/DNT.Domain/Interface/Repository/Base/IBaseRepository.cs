namespace DNT.Domain
{
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Lay tat ca ban ghi
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<TEntity>> GetAll();

        /// <summary>
        /// Lay ban ghi theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TEntity> GetById(Guid id);

        Task<IEnumerable<TEntity>> GetByListIds(List<Guid> ids);

        /// <summary>
        /// Tim kiem theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TEntity?> FindById(Guid id);

        /// <summary>
        /// Tao ban ghi moi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task Create(TEntity entity);

        /// <summary>
        /// Chinh sua ban ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task Update(Guid id, TEntity entity);

        /// <summary>
        /// Xoa ban ghi
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task Delete(Guid id);

        /// <summary>
        /// Xoa nhieu ban ghi
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        Task DeleteMany(List<Guid> ids);

        /// <summary>
        /// Lưu thay đổi
        /// </summary>
        /// <returns></returns>
        Task SaveChanges();
    }
}
