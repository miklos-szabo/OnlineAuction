using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Dal.Entities
{
    public class Bid
    {
        public int Id { get; set; }
        public int AuctionId { get; set; }
        public string BidderUserName { get; set; }
        public string BidderFullName { get; set; }
        public int Price { get; set; }
        public DateTime BidTime { get; set; }

        public virtual Auction Auction { get; set; }
    }
}
