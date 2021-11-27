using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineAuction.Dal.Migrations
{
    public partial class ReAddNecessary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsClosedByCreator",
                table: "Auction",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsClosedByCreator",
                table: "Auction");
        }
    }
}
