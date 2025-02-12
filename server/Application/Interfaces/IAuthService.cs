

using server.Core.DTO;

namespace server.Application.Interfaces
{
    public interface IAuthService
    {
        public Task<AuthResult> RegisterAsync(RegistrationRequest request);
        public Task<AuthResult> LoginAsync(LoginRequest request);
        
    }
}