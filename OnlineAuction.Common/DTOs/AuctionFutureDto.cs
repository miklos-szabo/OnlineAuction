using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class AuctionFutureDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Creator { get; set; }
        public int StartingPrice { get; set; }
    }
}
