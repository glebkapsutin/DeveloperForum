using DevelopForum.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DevelopForum.Infastructure.Data
{
    public class DevelopForumContext : DbContext
    {
        public DevelopForumContext(DbContextOptions<DevelopForumContext> options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }
    }

   
}