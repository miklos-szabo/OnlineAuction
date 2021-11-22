using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class AddAuctionDto
    {
        public string ItemName { get; set; }
        public byte[] Picture { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int StartingPrice { get; set; }
        public int PriceStep { get; set; }
    }
}
