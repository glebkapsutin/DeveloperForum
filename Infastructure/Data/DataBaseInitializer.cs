using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
namespace DevelopForum.Infastructure.Data
{
    public static class DataBaseInitializer
    {
        public static void ApplyMigrations(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<DevelopForumDbContext>();
            context.Database.Migrate();
        }
    }
}
