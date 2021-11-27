using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineAuction.Dal.Migrations
{
    public partial class Unnecessary_Items : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BidderFullName",
                table: "Bid");

            migrationBuilder.DropColumn(
                name: "IsClosedByCreator",
                table: "Auction");

            migrationBuilder.RenameColumn(
                name: "SenderFullName",
                table: "ChatMessage",
                newName: "SenderUserName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SenderUserName",
                table: "ChatMessage",
                newName: "SenderFullName");

            migrationBuilder.AddColumn<string>(
                name: "BidderFullName",
                table: "Bid",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsClosedByCreator",
                table: "Auction",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
