using server.Application.Interfaces;
using server.Application.Services;
using server.Presentation.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using server.Core.Models;
using server.Infrastructure.Data;
using server.Infrastructure.Repositories;


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

        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});




builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
            ValidateIssuer = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtSettings.Audience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();




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
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IFollowsService, FollowsService>();
builder.Services.AddScoped<IFollowsRepository, FollowsRepository>();
builder.Services.AddScoped<ILikesService, LikesService>();
builder.Services.AddScoped<ILikesRepository, LikesRepository>();
builder.Services.AddHttpContextAccessor();
var app = builder.Build();

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

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers(); 



app.Run();
