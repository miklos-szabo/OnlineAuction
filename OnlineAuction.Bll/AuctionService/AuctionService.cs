using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OnlineAuction.Bll.Hubs;
using OnlineAuction.Bll.Hubs.Clients;
using OnlineAuction.Common.DTOs;
using OnlineAuction.Common.RequestContext;

namespace OnlineAuction.Bll.AuctionService
{
    public class AuctionService: IAuctionService
    {
        private readonly IRequestContext _requestContext;
        private readonly IHubContext<AuctionHub, IBidClient> _auctionHub;

        public AuctionService(IRequestContext requestContext, IHubContext<AuctionHub, IBidClient> auctionHub)
        {
            _requestContext = requestContext;
            _auctionHub = auctionHub;
        }

        public async Task<string> Hello()
        {
            await _auctionHub.Clients.Group("groupname").ReceiveBid("todo");
            return $"Hello {_requestContext.UserName} {_requestContext.Name} {_requestContext.Email}";
        }

        public Task CreateAuction(AddAuctionDto dto)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuctionClosedDto>> GetClosedAuctions()
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuctionOngoingDto>> GetOngoingAuctions()
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuctionFutureDto>> GetFutureAuctions()
        {
            throw new System.NotImplementedException();
        }

        public Task<AuctionDetailsDto> GetAuctionDetails(int auctionId)
        {
            throw new System.NotImplementedException();
        }

        public Task EditAuction(EditAuctionDto dto)
        {
            throw new System.NotImplementedException();
        }

        public Task CloseAuction(int auctionId)
        {
            throw new System.NotImplementedException();
        }

        public Task BidOnAuction(CreateBidDto dto)
        {
            throw new System.NotImplementedException();
        }

        public Task SendChatMessage(int auctionId, string message)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<ChatMessageDto>> GetChatMessages(int auctionId)
        {
            throw new System.NotImplementedException();
        }
    }
}
