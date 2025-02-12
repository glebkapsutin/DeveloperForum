using server.Application.Interfaces;

using server.Core.Models;

using Microsoft.AspNetCore.Mvc;

namespace server.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            
                var categories = await _categoryService.GetAllCategories();
                return Ok(categories);
           
        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
           
                var category = await _categoryService.GetDetailsCategory(id);
                return Ok(category);
            
        
        }
        [HttpDelete]
        public async Task<ActionResult<Post>> DeleteCategory(int id)
        {
           
                var posts = await _categoryService.RemoveCategory(id);
                return Ok(posts);
           
        }
        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost([FromBody] Category  category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           
                var CreatedPost = await _categoryService.CreateCategory(category);
                return CreatedAtAction(nameof(GetCategoryById), new { id = CreatedPost.Id }, CreatedPost);
            
           

        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Post>> UpdatePost(int id, [FromBody] Category category)
        {
            if (id != category.Id)
            {
                return BadRequest("ID in URL does not match ID in body.");
            }
           
                var posts = await _categoryService.ModifyCategory(category);
                return Ok(posts);
           

        }



    }
}
