using server.Application.Interfaces;
using server.Application.Services;
using server.Infastructure.Data;
using server.Infastructure.Repositories;
using server.Presentation.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var isDocker = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";

var connectionString = isDocker
    ? builder.Configuration.GetConnectionString("DockerConnection")
    : builder.Configuration.GetConnectionString("DefaultConnection");


builder.Services.AddDbContext<DevelopForumDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

var app = builder.Build();
//комментить это на windows visual studio
DataBaseInitializer.ApplyMigrations(app.Services); 
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

   
    app.UseSwagger();

    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/swagger/v1/swagger.json","DevelopForum API v1");
        options.RoutePrefix = string.Empty;
    });
}



app.UseMiddleware<ExceptionHandlingMiddleware>(); 
app.UseAuthorization();

app.MapControllers(); 
app.UseCors("AllowAll");


app.Run();
