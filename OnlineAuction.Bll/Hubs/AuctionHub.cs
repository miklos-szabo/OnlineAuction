using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OnlineAuction.Bll.Hubs.Clients;

namespace OnlineAuction.Bll.Hubs
{
    public class AuctionHub : Hub<IBidClient>
    {
        public Task JoinAuction(string auctionName)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, auctionName);
        }

        public Task LeaveAuction(string auctionName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, auctionName);
        }
    }
}
