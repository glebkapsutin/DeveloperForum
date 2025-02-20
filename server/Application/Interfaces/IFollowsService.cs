using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Core.Models;

namespace server.Application.Interfaces
{
    public interface IFollowsService
    {
        public Task SubscribeAsync(int followerId, int followingId);
        public Task UnsubscribeAsync(int followerId, int followingId);
    }

}