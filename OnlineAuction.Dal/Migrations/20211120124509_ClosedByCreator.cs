using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineAuction.Dal.Migrations
{
    public partial class ClosedByCreator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Auction",
                newName: "IsClosedByCreator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsClosedByCreator",
                table: "Auction",
                newName: "IsDeleted");
        }
    }
}
