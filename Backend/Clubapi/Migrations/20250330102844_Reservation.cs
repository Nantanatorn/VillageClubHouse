using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClubAPI.Migrations
{
    /// <inheritdoc />
    public partial class Reservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    R_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Fac_ID = table.Column<int>(type: "int", nullable: false),
                    R_Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    R_Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    R_Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    R_CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    R_UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    R_Duration = table.Column<int>(type: "int", nullable: false),
                    R_Note = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.R_id);
                    table.ForeignKey(
                        name: "FK_Reservations_Facilities_Fac_ID",
                        column: x => x.Fac_ID,
                        principalTable: "Facilities",
                        principalColumn: "Fac_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservations_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_Fac_ID",
                table: "Reservations",
                column: "Fac_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_Id",
                table: "Reservations",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservations");
        }
    }
}
