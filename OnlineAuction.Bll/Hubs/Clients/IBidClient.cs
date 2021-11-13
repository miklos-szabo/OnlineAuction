using System.Threading.Tasks;

namespace OnlineAuction.Bll.Hubs.Clients
{
    public interface IBidClient
    {
        Task ReceiveBid(string todo);

        public Task JoinAuction(string auctionName);

        public Task LeaveAuction(string auctionName);
    }
}
