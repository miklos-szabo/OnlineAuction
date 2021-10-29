using Microsoft.EntityFrameworkCore;
using OnlineAuction.Dal.Configurations;
using OnlineAuction.Dal.Entities;

namespace OnlineAuction.Dal
{
    public class CoolDbContext : DbContext
    {
        public DbSet<TBD> TBDs { get; set; }

        public CoolDbContext(DbContextOptions<CoolDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            EntityConfigurations.ConfigureAllEntities(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
    }
}
