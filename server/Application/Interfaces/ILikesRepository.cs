using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Application.Interfaces
{
    public interface ILikesRepository
    {
        public Task Like(int PostId, int UserId);

        public Task Unlike(int PostId, int UserId);
    }
}