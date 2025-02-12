using server.Core.Models;

namespace server.Application.Interfaces
{
    public interface ICategoryService
    {
        public Task<Category> GetDetailsCategory(int id);

        public Task<IEnumerable<Category>> GetAllCategories();

        public Task<Category> ModifyCategory(Category category);
        public Task<Category> RemoveCategory(int id);

        public Task<Category> CreateCategory(Category category);
    }
}
