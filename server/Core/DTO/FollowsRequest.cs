using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Core.DTO
{
    public class FollowsRequest
    {
        public int FollowerId { get; set; }
        public int FollowingId { get; set; }
    }
}