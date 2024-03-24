using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendNetCoreApi.Migrations
{
    /// <inheritdoc />
    public partial class Categories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductPrice",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductQuantity",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Products",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "Brand_Id",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Category_Id",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Products",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Detail",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Products",
                type: "nvarchar(1000)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Qty",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Products",
                type: "nvarchar(1000)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UpdateBy",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Banners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Link = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Position = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Sort_order = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Parent_Id = table.Column<int>(type: "int", nullable: true),
                    Sort_Order = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    ReplayId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    Link = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Order_details",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order_id = table.Column<int>(type: "int", nullable: false),
                    Product_id = table.Column<int>(type: "int", nullable: false),
                    Discount = table.Column<double>(type: "float", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Qty = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_details", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DeliveryName = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    DeliveryGender = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    DeliveryPhone = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    DeliveryAddress = table.Column<string>(type: "nvarchar(1000)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true),
                    Total = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductSales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Discount = table.Column<int>(type: "int", nullable: false),
                    Qty = table.Column<int>(type: "int", nullable: false),
                    Date_Begin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date_End = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSales", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false),
                    Roles = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Banners");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "Order_details");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "ProductSales");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropColumn(
                name: "Brand_Id",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Category_Id",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Detail",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Qty",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UpdateBy",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Products",
                newName: "ProductId");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProductPrice",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "ProductQuantity",
                table: "Products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
