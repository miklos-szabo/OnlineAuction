using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using OnlineAuction.Common.DTOs;
using OnlineAuction.Dal.Entities;

namespace OnlineAuction.Bll.Mappings
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Bid, BidDto>();

            CreateMap<Auction, AuctionClosedDto>()
                .ForMember(x => x.WinnerPrice, o => o.MapFrom(t => t.Bids.Max(b => b.Price)));

            CreateMap<Auction, AuctionDetailsDto>()
                .ForMember(x => x.HighestBid, o => o.MapFrom(t => t.Bids.Max(b => b.Price)))
                .ForMember(x => x.Picture, o => o.MapFrom(t => Convert.ToBase64String(t.Picture)))
                .ForMember(x => x.LastBids, o => o.MapFrom(t => t.Bids.OrderByDescending(b => b.Price).Take(20)));

            CreateMap<Auction, AuctionFutureDto>();

            CreateMap<Auction, AuctionOngoingDto>()
                .ForMember(x => x.HighestBid, o => o.MapFrom(t => t.Bids.Max(b => b.Price)));

            CreateMap<ChatMessage, ChatMessageDto>();
        }
    }
}
