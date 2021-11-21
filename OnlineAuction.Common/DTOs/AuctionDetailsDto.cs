using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class AuctionDetailsDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string Picture { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Creator { get; set; }
        public int StartingPrice { get; set; }
        public int PriceStep { get; set; }

        public int? HighestBid { get; set; }
        public List<BidDto> LastBids { get; set; }
    }
}
