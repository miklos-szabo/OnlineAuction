using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineAuction.Api.Authentication;
using OnlineAuction.Bll.AuctionService;

namespace OnlineAuction.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = AuthenticationSchemes.JwtBearer)]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        [HttpGet]
        public async Task<string> HelloWorld()
        {
            return await _auctionService.Hello();
        }
    }
}
