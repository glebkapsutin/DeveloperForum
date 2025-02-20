using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Application.Interfaces
{
    public interface IFollowsRepository
    {
        public Task AddFollowAsync(int followerId, int followingId);
        public Task RemoveFollowAsync(int followerId, int followingId);
       
    }

}