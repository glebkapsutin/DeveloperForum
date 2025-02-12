using server.Core.Models;

namespace server.Application.Interfaces
{
    public interface ICategoryRepository
    {
        public Task<Category> GetCategoryById(int id);

        public Task<IEnumerable<Category>> GetCategories();

        public Task UpdateCategory(Category category);
        public Task DeleteCategory(int id);

        public Task AddCategory(Category category);
    }
}
