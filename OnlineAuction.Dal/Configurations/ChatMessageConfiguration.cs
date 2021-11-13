using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineAuction.Dal.Entities;

namespace OnlineAuction.Dal.Configurations
{
    internal class ChatMessageConfiguration : IEntityTypeConfiguration<ChatMessage>
    {
        public void Configure(EntityTypeBuilder<ChatMessage> builder)
        {
            builder.ToTable("ChatMessage");

            builder.HasOne(d => d.Auction)
                .WithMany(p => p.ChatMessages)
                .HasForeignKey(d => d.AuctionId)
                .HasConstraintName("FK_ChatMessage_Auction");
        }
    }
}
