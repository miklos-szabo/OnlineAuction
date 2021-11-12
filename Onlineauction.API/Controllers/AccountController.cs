using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineAuction.Bll.AuthenticationService;
using OnlineAuction.Common.DTOs;

namespace OnlineAuction.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task Register(RegisterDto dto)
        {
            await _accountService.Register(dto);
        }

        [HttpGet]
        public async Task<string> GetSaltForUser(string userName)
        {
            return await _accountService.GetSaltForUser(userName);
        }

        [HttpPost]
        public async Task<string> Login(LoginDto dto)
        {
            return await _accountService.Login(dto);
        }
    }
}
