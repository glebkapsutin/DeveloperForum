using server.Application.Interfaces;
using server.Core.Models;
using Microsoft.Extensions.Hosting;

namespace server.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
            
        }

        public async Task<Category> CreateCategory(Category category)
        {
            if (category != null)
            {
                await _repository.AddCategory(category);
                return category;
            }
            throw new ArgumentNullException(nameof(category), "Category cannot be null.");
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _repository.GetCategories();
        }

        public async Task<Category> GetDetailsCategory(int id)
        {
            if (id <= 0)
            {
               throw new ArgumentOutOfRangeException(nameof(id), "Category ID must be greater than zero.");
            }
            return await _repository.GetCategoryById(id);

        }

        public async Task<Category> ModifyCategory(Category category)
        {
            if(category == null)
            {
                throw new ArgumentNullException("Post  was not found.", nameof(category));
            }
            await _repository.UpdateCategory(category);
            return category;
        }

        public async Task<Category> RemoveCategory(int id)
        {   
            if (id <= 0)
                throw new ArgumentOutOfRangeException(nameof(id), "Category ID must be greater than zero.");
            var category = await _repository.GetCategoryById(id);
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {id} was not found.");


            await _repository.DeleteCategory(id);
            return category;

        }
    }
}
