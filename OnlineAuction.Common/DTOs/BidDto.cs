using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class BidDto
    {
        public int Id { get; set; }
        public string BidderUserName { get; set; }
        public int Price { get; set; }
        public DateTime BidTime { get; set; }
    }
}
