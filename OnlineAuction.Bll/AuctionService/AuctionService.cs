using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OnlineAuction.Common.RequestContext;

namespace OnlineAuction.Bll.AuctionService
{
    public class AuctionService: IAuctionService
    {
        private readonly IRequestContext _requestContext;

        public AuctionService(IRequestContext requestContext)
        {
            _requestContext = requestContext;
        }

        public async Task<string> Hello()
        {
            return $"Hello {_requestContext.UserName} {_requestContext.Name} {_requestContext.Email}";
        }
    }
}
