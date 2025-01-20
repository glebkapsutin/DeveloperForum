using DevelopForum.Application.Interfaces;
using DevelopForum.Core.Models;
using DevelopForum.Infastructure.Repositories;
using Microsoft.AspNetCore.Mvc;



namespace DevelopForum.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {

        }

       
    }
}
