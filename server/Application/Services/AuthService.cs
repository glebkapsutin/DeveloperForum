
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using server.Application.Interfaces;
using server.Core.DTO;
using server.Core.Enums;
using server.Core.Models;

namespace server.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;

        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _passwordHasher = new PasswordHasher<User>();
            _configuration = configuration;
        }
        
        public async Task<AuthResult> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetUserByEmailAsync(request.Email);
            if (user == null || _passwordHasher.VerifyHashedPassword(null, user.Password, request.Password) != PasswordVerificationResult.Success)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = "Неверные учетные данные"
                };
            }

            return new AuthResult
            {
                Success = true,
                Message = "Вход выполнен успешно",
                Token = GenerateJwtToken(user),
                User = new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    role = user.Role,
                }
            };
        }

        public async Task<AuthResult> RegisterAsync(RegistrationRequest request)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return new AuthResult
                {
                    Success = false,
                    Message = "Email уже зарегистрирован"
                };
            }
            var user = new User
            {
                UserName=request.Username,
                Email=request.Email,
                Password= _passwordHasher.HashPassword(null,request.Password),
                Role = new Role{TypeOfRole = RoleType.User},
                RoleId = 2
            };
            await _userRepository.AddUserAsync(user);
            return new AuthResult
            {
                Success=true,
                Message = "",
                Token=GenerateJwtToken(user),
                User = new UserDto
                {
                    Id=user.Id,
                    Username=user.UserName,
                    Email=user.Email,
                    role =user.Role,
                    


                } 
            };
            
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt").Get<JwtSettings>();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(jwtSettings.ExpireMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}