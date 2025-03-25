using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClubAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFacilitiesModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Facilities",
                columns: table => new
                {
                    Fac_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fac_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fac_Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fac_Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fac_Capacity = table.Column<int>(type: "int", nullable: false),
                    Fac_Used = table.Column<int>(type: "int", nullable: false),
                    Fac_Empty = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facilities", x => x.Fac_ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Facilities");
        }
    }
}
