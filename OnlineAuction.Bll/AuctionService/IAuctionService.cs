using System.Collections.Generic;
using System.Threading.Tasks;
using OnlineAuction.Common.DTOs;

namespace OnlineAuction.Bll.AuctionService
{
    public interface IAuctionService
    {
        Task CreateAuction(AddAuctionDto dto);
        Task<List<AuctionClosedDto>> GetClosedAuctions();
        Task<List<AuctionOngoingDto>> GetOngoingAuctions();
        Task<List<AuctionFutureDto>> GetFutureAuctions();

        Task<AuctionDetailsDto> GetAuctionDetails(int auctionId);
        Task EditAuction(EditAuctionDto dto);
        Task CloseAuction(int auctionId);
        Task BidOnAuction(CreateBidDto dto);
        Task SendChatMessage(int auctionId, string message);
        Task<List<ChatMessageDto>> GetChatMessages(int auctionId);
    }
}
