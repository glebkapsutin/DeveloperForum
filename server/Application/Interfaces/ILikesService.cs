using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Application.Interfaces
{
    public interface ILikesService
    {
        public Task AddLike(int PostId, int UserId);
        public Task RemoteLike(int PostId,int UserId);
    }
}