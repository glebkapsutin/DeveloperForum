using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Application.Interfaces;
using server.Core.Models;

namespace server.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikesController : ControllerBase
    {
        private readonly ILikesService _likesService;

        public LikesController(ILikesService likesService)
        {
            _likesService = likesService;
        }

        
        [HttpPost("like")]
        public async Task<IActionResult> LikePost([FromBody] Likes request)
        {
            try
            {
                await _likesService.AddLike(request.UserId, request.PostId);
                return Ok(new { message = "Лайк поставлен." });
            }
            catch (Exception ex)
            {
                // Здесь можно добавить логирование
                return BadRequest(new { error = ex.Message });
            }
        }

       
        [HttpDelete("unlike")]
        public async Task<IActionResult> UnlikePost([FromBody] Likes request)
        {
            try
            {
                await _likesService.RemoteLike(request.UserId, request.PostId);
                return Ok(new { message = "Лайк удалён." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

}