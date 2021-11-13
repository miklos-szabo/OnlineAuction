using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OnlineAuction.Bll.Hubs;
using OnlineAuction.Bll.Hubs.Clients;
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
    }
}
