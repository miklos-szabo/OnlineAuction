using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Dal.Entities
{
    public class Auction
    {
        public Auction()
        {
            Bids = new HashSet<Bid>();
            ChatMessages = new HashSet<ChatMessage>();
        }

        public int Id { get; set; }
        public string ItemName { get; set; }
        public byte[] Picture { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Creator { get; set; }
        public int StartingPrice { get; set; }
        public int PriceStep { get; set; }
        public bool IsClosedByCreator { get; set; }

        public virtual ICollection<Bid> Bids { get; set; }
        public virtual ICollection<ChatMessage> ChatMessages { get; set; }
    }
}
