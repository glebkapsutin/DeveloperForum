using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevelopForum.Migrations
{
    /// <inheritdoc />
    public partial class newUserIsFollowing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFollowing",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFollowing",
                table: "Users");
        }
    }
}
