using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using AuthenticationOptions = OnlineAuction.Common.Options.AuthenticationOptions;

namespace OnlineAuction.Api.Authentication
{
    public class JwtBearerAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly AuthenticationOptions _options;

        public JwtBearerAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, IOptions<AuthenticationOptions> authOptions) : base(options, logger, encoder, clock)
        {
            _options = authOptions.Value;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return AuthenticateResult.Fail("Missing Authorization Header");
            }

            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Convert.FromBase64String(_options.JwtKey);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userName = jwtToken.Claims.First(x => x.Type == "nameid").Value;    // These are the claim strings
                var name = jwtToken.Claims.First(x => x.Type == "unique_name").Value;
                var email = jwtToken.Claims.First(x => x.Type == "email").Value;

                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userName),
                    new Claim(ClaimTypes.Name, name),
                    new Claim(ClaimTypes.Email, email)
                };

                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                return await Task.FromResult(AuthenticateResult.Success(ticket));
            }
            catch
            {
                return AuthenticateResult.Fail("Invalid Bearer token!");
            }
        }
    }
}
