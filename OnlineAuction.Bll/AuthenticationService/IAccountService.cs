using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineAuction.Common.DTOs;

namespace OnlineAuction.Bll.AuthenticationService
{
    public interface IAccountService
    {
        Task Register(RegisterDto dto);

        Task<string> GetSaltForUser(string userName);

        Task<string> Login(LoginDto dto);
    }
}
