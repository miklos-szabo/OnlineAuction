using System.Threading.Tasks;
using OnlineAuction.Common.DTOs;

namespace OnlineAuction.Bll.Hubs.Clients
{
    public interface IBidClient
    {
        Task ReceiveBid(BidDto bidDto);

        public Task JoinAuction(string auctionName);

        public Task LeaveAuction(string auctionName);
    }
}
