using Microsoft.EntityFrameworkCore;

namespace OnlineAuction.Dal.Configurations
{
    public class EntityConfigurations
    {
        public static void ConfigureAllEntities(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
    }
}
