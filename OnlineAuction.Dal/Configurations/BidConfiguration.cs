using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineAuction.Dal.Entities;

namespace OnlineAuction.Dal.Configurations
{
    internal class BidConfiguration : IEntityTypeConfiguration<Bid>
    {
        public void Configure(EntityTypeBuilder<Bid> builder)
        {
            builder.ToTable("Bid");


            builder.HasOne(d => d.Auction)
                .WithMany(p => p.Bids)
                .HasForeignKey(d => d.AuctionId)
                .HasConstraintName("FK_Bid_Auction");
        }
    }
}
