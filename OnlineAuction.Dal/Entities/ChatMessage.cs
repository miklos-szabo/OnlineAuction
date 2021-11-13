using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Dal.Entities
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public int AuctionId { get; set; }
        public string SenderFullName { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Message { get; set; }
        public virtual Auction Auction { get; set; }
    }
}
