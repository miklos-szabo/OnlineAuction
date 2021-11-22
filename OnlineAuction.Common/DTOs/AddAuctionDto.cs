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
        public string StartingPrice { get; set; }
        public string PriceStep { get; set; }
    }
}
