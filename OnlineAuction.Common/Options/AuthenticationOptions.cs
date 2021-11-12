using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineAuction.Common.Options
{
    public class AuthenticationOptions
    {
        public string JwtKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
