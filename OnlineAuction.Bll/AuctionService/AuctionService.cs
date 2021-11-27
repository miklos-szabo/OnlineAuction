using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using OnlineAuction.Bll.Hubs;
using OnlineAuction.Bll.Hubs.Clients;
using OnlineAuction.Common.DTOs;
using OnlineAuction.Common.Exceptions;
using OnlineAuction.Common.RequestContext;
using OnlineAuction.Dal;
using OnlineAuction.Dal.Entities;

namespace OnlineAuction.Bll.AuctionService
{
    public class AuctionService: IAuctionService
    {
        private readonly IRequestContext _requestContext;
        private readonly IHubContext<AuctionHub, IBidClient> _auctionHub;
        private readonly OnlineAuctionContext _context;
        private readonly IMapper _mapper;

        public AuctionService(IRequestContext requestContext, IHubContext<AuctionHub, IBidClient> auctionHub, OnlineAuctionContext context, IMapper mapper)
        {
            _requestContext = requestContext;
            _auctionHub = auctionHub;
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateAuction(AddAuctionDto dto)
        {
            await _context.AddAsync(new Auction
            {
                Creator = _requestContext.UserName,
                Description = dto.Description,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Picture = Convert.FromBase64String(dto.Picture),
                ItemName = dto.ItemName,
                PriceStep = dto.PriceStep ,
                StartingPrice = dto.StartingPrice,
                IsClosedByCreator = false,
            });

            await _context.SaveChangesAsync();
        }

        public async Task<List<AuctionClosedDto>> GetClosedAuctions()
        {
            return await _context.Auctions
                .Where(a => a.EndTime < DateTime.Now || a.IsClosedByCreator)
                .ProjectTo<AuctionClosedDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<AuctionOngoingDto>> GetOngoingAuctions()
        {
            return await _context.Auctions
                .Where(a => a.EndTime > DateTime.Now && a.StartTime < DateTime.Now && !a.IsClosedByCreator)
                .ProjectTo<AuctionOngoingDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<AuctionFutureDto>> GetFutureAuctions()
        {
            return await _context.Auctions
                .Where(a => a.StartTime > DateTime.Now && !a.IsClosedByCreator)
                .ProjectTo<AuctionFutureDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<AuctionDetailsDto> GetAuctionDetails(int auctionId)
        {
            var auction = await _context.Auctions.Include(a => a.Bids).SingleAsync(a => a.Id == auctionId);
            var details = _mapper.Map<AuctionDetailsDto>(auction);

            details.IsBidButtonActive = _requestContext.UserName != details.Creator && details.StartTime < DateTime.Now && details.EndTime > DateTime.Now && !auction.IsClosedByCreator;
            details.IsCloseAuctionButtonActive = _requestContext.UserName == details.Creator && details.EndTime > DateTime.Now && !auction.IsClosedByCreator;

            return details;
        }

        public async Task EditAuction(EditAuctionDto dto)
        {
            var auction = await _context.Auctions.SingleOrDefaultAsync(a => a.Id == dto.Id);

            if(auction == null)
                throw new NotFoundException($"Auction {dto.Id} was not found");

            auction.Description = dto.Description;
            auction.StartTime = dto.StartTime;
            auction.EndTime = dto.EndTime;
            auction.Picture = dto.Picture;
            auction.ItemName = dto.ItemName;
            auction.PriceStep = dto.PriceStep;
            auction.StartingPrice = dto.StartingPrice;

            await _context.SaveChangesAsync();
        }

        public async Task CloseAuction(int auctionId)
        {
            var auction = await _context.Auctions.SingleOrDefaultAsync(a => a.Id == auctionId);

            if (auction == null)
                throw new NotFoundException($"Auction {auctionId} was not found");

            auction.IsClosedByCreator = true;
            await _context.SaveChangesAsync();
        }

        public async Task BidOnAuction(CreateBidDto dto)
        {
            var auction = await _context.Auctions.Include(a => a.Bids)
                .SingleOrDefaultAsync(a => a.Id == dto.AuctionId);

            if (auction == null)
                throw new NotFoundException($"Auction {dto.AuctionId} was not found");

            if(auction.Bids.Count != 0 && dto.Price < auction.Bids.Max(b => b.Price) + auction.PriceStep)
                throw new BadRequestException("Price is lower than the current highest bid + price step!");

            if (dto.Price < auction.StartingPrice)
                throw new BadRequestException("Price is lower than the starting price!");

            if (_requestContext.UserName == auction.Creator)
                throw new BadRequestException("You can't bid on your own auction!");

            if(auction.EndTime < DateTime.Now || auction.IsClosedByCreator)
                throw new BadRequestException("Auction is closed!");

            if (auction.StartTime > DateTime.Now)
                throw new BadRequestException("Auction hasn't started yet!");

            var newBid = new Bid
            {
                AuctionId = dto.AuctionId,
                BidTime = DateTime.Now,
                BidderFullName = _requestContext.Name,
                BidderUserName = _requestContext.UserName,
                Price = dto.Price
            };

            _context.Bids.Add(newBid);
            await _context.SaveChangesAsync();

            await _auctionHub.Clients.Group(dto.AuctionId.ToString()).ReceiveBid(
                await _context.Bids.Where(b => b.AuctionId == dto.AuctionId).OrderByDescending(b => b.Price).Take(10)
                    .ProjectTo<BidDto>(_mapper.ConfigurationProvider).ToArrayAsync());
        }

        public async Task SendChatMessage(int auctionId, string message)
        {
            var auction = await _context.Auctions.SingleOrDefaultAsync(a => a.Id == auctionId);

            if (auction == null)
                throw new NotFoundException($"Auction {auctionId} was not found");

            var chatMessage = new ChatMessage
            {
                AuctionId = auctionId,
                Message = message,
                SenderFullName = _requestContext.UserName,
                TimeStamp = DateTime.Now,
            };

            _context.ChatMessages.Add(chatMessage);
            await _context.SaveChangesAsync();

            await _auctionHub.Clients.Groups(auctionId.ToString()).ReceiveChatMessage(
                await _context.ChatMessages.Where(m => m.AuctionId == auctionId).OrderByDescending(m => m.TimeStamp).Take(10)
                    .ProjectTo<ChatMessageDto>(_mapper.ConfigurationProvider).ToArrayAsync());
        }

        public async Task<List<ChatMessageDto>> GetChatMessages(int auctionId)
        {
            var messages = await _context.ChatMessages
                .Where(c => c.AuctionId == auctionId)
                .ProjectTo<ChatMessageDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return messages;
        }
    }
}
