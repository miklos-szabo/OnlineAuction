using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class ChatMessageDto
    {
        public DateTime TimeStamp { get; set; }
        public string SenderUserName { get; set; }
        public string Message { get; set; }
    }
}
