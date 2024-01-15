using DNT.Domain;
using Microsoft.EntityFrameworkCore;

namespace DNT.Infrastructure
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class, IHasKey
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<TEntity> _dbSet;

        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public async Task Create(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public virtual async Task Delete(Guid id)
        {
            var entity = await FindById(id);
            if (entity == null)
            {
                throw new Exception("Not found");
            }

            _dbSet.Remove(entity);
        }

        public virtual async Task DeleteMany(List<Guid> ids)
        {
            var entities = await _dbSet.Where(entity => ids.Contains(entity.GetKey())).ToListAsync();

            if (entities.Count != ids.Count)
            {
                throw new Exception("Not found");
            }

            _dbSet.RemoveRange(entities);
        }

        public virtual async Task<TEntity?> FindById(Guid id)
        {
            var entity = await _dbSet.FindAsync(id);

            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            var entities = await _dbSet.ToListAsync();

            return entities;
        }

        public virtual async Task<TEntity> GetById(Guid id)
        {
            var entity = await FindById(id);
            if (entity == null)
            {
                throw new Exception("Not found");
            }

            return entity;
        }

        public virtual async Task Update(Guid id, TEntity entity)
        {
            var existingEntity = await GetById(id);
            if (entity == null)
            {
                throw new Exception("Not found");
            }

            _context.Entry(existingEntity).CurrentValues.SetValues(entity);

        }

        public virtual async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }

        public virtual async Task<IEnumerable<TEntity>> GetByListIds(List<Guid> ids)
        {
            var entities = await _dbSet.Where(entity => ids.Contains(entity.Id)).ToListAsync();

            return entities;
        }

    }
}
