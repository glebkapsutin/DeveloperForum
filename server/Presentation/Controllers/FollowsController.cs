using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Application.Interfaces;
using server.Core.DTO;

namespace server.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FollowsController : ControllerBase
    {
        private readonly IFollowsService _followsService;

        public FollowsController(IFollowsService followsService)
        {
            _followsService = followsService;
        }

        // POST: api/follows/subscribe
        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromBody] FollowsRequest request)
        {
            try
            {
                await _followsService.SubscribeAsync(request.FollowerId, request.FollowingId);
                return Ok(new { message = "Подписка оформлена успешно." });
            }
            catch (Exception ex)
            {
                
                return BadRequest(new { error = ex.Message });
            }
        }

        // DELETE: api/follows/unsubscribe
        [HttpDelete("unsubscribe")]
        public async Task<IActionResult> Unsubscribe([FromBody] FollowsRequest request)
        {
            try
            {
                await _followsService.UnsubscribeAsync(request.FollowerId, request.FollowingId);
                return Ok(new { message = "Подписка удалена успешно." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

}