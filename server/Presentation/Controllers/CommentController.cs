using server.Application.Interfaces;
using server.Core.Models;
using server.Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace server.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetComments()
        {
            try
            {
                var comments = await _commentService.GetAllComments();
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}" + " Check GetComments Controller");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDTO>> GetCommentById(int id)
        {
            try
            {
                var comment = await _commentService.GetDetailsComment(id);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + $" and error GetCommentsbyId with Id:{id} in Controller");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentDTO>> DeleteComments(int id)
        {
            var comment = await _commentService.RemoveComment(id);
            return Ok(comment);
        }

        [HttpPost]
        public async Task<ActionResult<CommentDTO>> CreateComment([FromBody] Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdComment = await _commentService.CreateComment(comment);
            return CreatedAtAction(nameof(GetCommentById), new { id = createdComment.Id }, createdComment);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CommentDTO>> UpdateComment(int id, [FromBody] Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest("ID in URL does not match ID in body.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedComment = await _commentService.ModifyComment(comment);
            return Ok(updatedComment);
        }
    }
}
