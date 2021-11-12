using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.DTOs
{
    public class LoginDto
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
    }
}
