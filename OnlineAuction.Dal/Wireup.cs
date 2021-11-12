using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OnlineAuction.Common.Options;

namespace OnlineAuction.Dal
{
    public static class Wireup
    {
        public static void AddDAL(this IServiceCollection services, ConnectionStringOptions connectionStringOptions)
        {
            services.AddDbContext<OnlineAuctionContext>(options =>
            {
                options.UseSqlServer(
                    connectionStringOptions.DefaultConnection,
                    x => x.MigrationsAssembly("OnlineAuction.Dal"));
            });
        }
    }
}
