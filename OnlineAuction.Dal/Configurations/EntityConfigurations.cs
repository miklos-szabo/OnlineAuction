using Microsoft.EntityFrameworkCore;

namespace OnlineAuction.Dal.Configurations
{
    public class EntityConfigurations
    {
        public static void ConfigureAllEntities(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new AuctionConfiguration());
            modelBuilder.ApplyConfiguration(new BidConfiguration());
            modelBuilder.ApplyConfiguration(new ChatMessageConfiguration());
        }
    }
}
