using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevelopForum.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePostModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Posts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Posts",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
