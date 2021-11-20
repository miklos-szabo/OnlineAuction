using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class AuctionClosedDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public DateTime EndTime { get; set; }
        public string Creator { get; set; }
        public bool IsClosedByCreator { get; set; }

        public int? WinnerPrice { get; set; }
    }
}
