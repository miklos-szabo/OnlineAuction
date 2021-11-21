using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineAuction.Api.Authentication;
using OnlineAuction.Bll.AuctionService;
using OnlineAuction.Common.DTOs;

namespace OnlineAuction.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = AuthenticationSchemes.JwtBearer)]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        [HttpPost("CreateAuction")]
        public async Task CreateAuction([FromBody] AddAuctionDto dto)
        {
            await _auctionService.CreateAuction(dto);
        }

        [HttpGet("GetClosedAuctions")]
        public async Task<List<AuctionClosedDto>> GetClosedAuctions()
        {
            return await _auctionService.GetClosedAuctions();
        }

        [HttpGet("GetOngoingAuctions")]
        public async Task<List<AuctionOngoingDto>> GetOngoingAuctions()
        {
            return await _auctionService.GetOngoingAuctions();
        }

        [HttpGet("GetFutureAuctions")]
        public async Task<List<AuctionFutureDto>> GetFutureAuctions()
        {
            return await _auctionService.GetFutureAuctions();
        }

        [HttpGet("{auctionId}/details")]
        public async Task<AuctionDetailsDto> GetAuctionDetails(int auctionId)
        {
            return await _auctionService.GetAuctionDetails(auctionId);
        }

        [HttpPost("{auctionId}/Edit")]
        public async Task EditAuction(EditAuctionDto dto)
        {
            await _auctionService.EditAuction(dto);
        }

        [HttpPost("{auctionId}/Close")]
        public async Task CloseAuction(int auctionId)
        {
            await _auctionService.CloseAuction(auctionId);
        }

        [HttpPost("{auctionId}/Bid")]
        public async Task BidOnAuction(CreateBidDto dto)
        {
            await _auctionService.BidOnAuction(dto);
        }

        [HttpPost("{auctionId}/SendMessage")]
        public async Task SendChatMessage(int auctionId, string message)
        {
            await _auctionService.SendChatMessage(auctionId, message);
        }

        [HttpGet("{auctionId}/GetMessages")]
        public async Task<List<ChatMessageDto>> GetChatMessages(int auctionId)
        {
            return await _auctionService.GetChatMessages(auctionId);
        }

    }
}
