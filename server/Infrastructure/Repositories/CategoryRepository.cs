using server.Application.Interfaces;
using server.Core.Models;
using server.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace server.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DevelopForumDbContext _dbContext;

        public CategoryRepository(DevelopForumDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddCategory(Category category)
        {
            await _dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var category = await _dbContext.Categories.FindAsync(id);
            _dbContext.Categories.Remove(category);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetCategoryById(int id)
        {
            return await _dbContext.Categories
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task UpdateCategory(Category category)
        {
            _dbContext.Entry(category).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }
    }
}
