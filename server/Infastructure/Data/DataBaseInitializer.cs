using Microsoft.EntityFrameworkCore;


namespace server.Infastructure.Data
{
    public static class DataBaseInitializer
    {
        public static void ApplyMigrations(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<DevelopForumDbContext>();

            // Ожидание доступности базы (например, 30 секунд)
            var maxRetries = 10;
            var delay = TimeSpan.FromSeconds(3);

            for (int i = 0; i < maxRetries; i++)
            {
                try
                {
                    context.Database.OpenConnection();
                    context.Database.Migrate();
                    context.Database.CloseConnection();
                    return;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Ошибка подключения к БД, попытка {i + 1}/{maxRetries}: {ex.Message}");
                    Thread.Sleep(delay);
                }
            }

            throw new Exception("Не удалось подключиться к БД после нескольких попыток.");
        }
    }
}
