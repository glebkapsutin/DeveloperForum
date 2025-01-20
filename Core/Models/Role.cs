using DevelopForum.Core.Enums;

namespace DevelopForum.Core.Models
{
    public class Role
    {   
        public int Id { get; set; }
        public RoleType TypeOfRole {  get; set; }
    }
}
