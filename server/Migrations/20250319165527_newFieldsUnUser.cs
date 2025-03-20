using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevelopForum.Migrations
{
    /// <inheritdoc />
    public partial class newFieldsUnUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataOfBirth",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataOfBirth",
                table: "Users");
        }
    }
}
