using Microsoft.EntityFrameworkCore;
using OnlineAuction.Dal.Configurations;
using OnlineAuction.Dal.Entities;

namespace OnlineAuction.Dal
{
    public class OnlineAuctionContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }

        public OnlineAuctionContext(DbContextOptions<OnlineAuctionContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            EntityConfigurations.ConfigureAllEntities(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
    }
}
