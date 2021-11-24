using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuction.Common.DTOs;

namespace OnlineAuction.Bll.Hubs.Clients
{
    public interface IBidClient
    {
        Task ReceiveBid(List<BidDto> bidDtos);

        Task ReceiveChatMessage(List<ChatMessageDto> chatMessageDtos);

        public Task JoinAuction(string auctionName);

        public Task LeaveAuction(string auctionName);
    }
}
