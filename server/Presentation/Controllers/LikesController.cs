using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Application.Interfaces;
using server.Core.Models;
using server.Core.DTO;
using Microsoft.AspNetCore.Cors;

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
        public async Task<IActionResult> LikePost([FromBody] LikeDTO request)
        {
            try
            {
                await _likesService.AddLike(request.PostId, request.UserId);
                return Ok(new { message = "Лайк поставлен." });
            }
            catch (Exception ex)
            {
                // Здесь можно добавить логирование
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("unlike")]
        public async Task<IActionResult> UnlikePost([FromQuery] int postId, [FromQuery] int userId)
        {
            try
            {
                await _likesService.RemoteLike(postId, userId);
                return Ok(new { message = "Лайк удалён." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}