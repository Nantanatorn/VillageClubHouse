using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClubAPI.Migrations
{
    /// <inheritdoc />
    public partial class Payment1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Pay_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    R_id = table.Column<int>(type: "int", nullable: false),
                    Pay_Amount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Pay_Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    Pay_Method = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Pay_Slip = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Pay_Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Verified_By = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Verified_At = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Pay_ID);
                    table.ForeignKey(
                        name: "FK_Payments_Reservations_R_id",
                        column: x => x.R_id,
                        principalTable: "Reservations",
                        principalColumn: "R_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_R_id",
                table: "Payments",
                column: "R_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");
        }
    }
}
