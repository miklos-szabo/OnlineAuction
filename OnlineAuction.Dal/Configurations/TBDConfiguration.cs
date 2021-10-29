using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineAuction.Dal.Entities;

namespace OnlineAuction.Dal.Configurations
{
    internal class TBDConfiguration : IEntityTypeConfiguration<TBD>
    {
        public void Configure(EntityTypeBuilder<TBD> builder)
        {
            builder.ToTable("TBD");

            //FK példa:
            //builder.HasOne(d => d.Head)
            //    .WithMany(p => p.ContractPartners)
            //    .HasForeignKey(d => d.ContractHeadId)
            //    .HasConstraintName("FK_ContractPartner_ContractHead");
        }
    }
}
