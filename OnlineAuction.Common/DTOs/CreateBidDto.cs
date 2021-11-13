using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class CreateBidDto
    {
        public int AuctionId { get; set; }
        public int Price { get; set; }
    }
}
