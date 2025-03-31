﻿// <auto-generated />
using System;
using ClubAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ClubAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250331062249_CreateTimeSlot")]
    partial class CreateTimeSlot
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ClubAPI.Models.FacilitiesModel", b =>
                {
                    b.Property<int>("Fac_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Fac_ID"));

                    b.Property<int>("Fac_Capacity")
                        .HasColumnType("int");

                    b.Property<string>("Fac_Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Fac_Empty")
                        .HasColumnType("int");

                    b.Property<string>("Fac_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fac_Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Fac_Used")
                        .HasColumnType("int");

                    b.Property<string>("Fac_img")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Fac_ID");

                    b.ToTable("Facilities");
                });

            modelBuilder.Entity("ClubAPI.Models.PaymentModel", b =>
                {
                    b.Property<int>("Pay_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Pay_ID"));

                    b.Property<decimal>("Pay_Amount")
                        .HasColumnType("decimal(10,2)");

                    b.Property<DateTime>("Pay_Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Pay_Method")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Pay_Slip")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Pay_Status")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("R_id")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Verified_At")
                        .HasColumnType("datetime");

                    b.Property<string>("Verified_By")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("Pay_ID");

                    b.HasIndex("R_id");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("ClubAPI.Models.ReservationModel", b =>
                {
                    b.Property<int>("R_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("R_id"));

                    b.Property<int>("Fac_ID")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("R_CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("R_Date")
                        .HasColumnType("datetime");

                    b.Property<int>("R_Duration")
                        .HasColumnType("int");

                    b.Property<string>("R_Note")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("R_Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("R_Time")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("R_UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("R_id");

                    b.HasIndex("Fac_ID");

                    b.HasIndex("Id");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("ClubAPI.Models.Timemodel", b =>
                {
                    b.Property<int>("Slot_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Slot_ID"));

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time");

                    b.Property<int>("Fac_ID")
                        .HasColumnType("int");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<string>("Label")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.HasKey("Slot_ID");

                    b.HasIndex("Fac_ID");

                    b.ToTable("TimeSlots");
                });

            modelBuilder.Entity("ClubAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdCard")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ClubAPI.Models.PaymentModel", b =>
                {
                    b.HasOne("ClubAPI.Models.ReservationModel", "Reservations")
                        .WithMany()
                        .HasForeignKey("R_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("ClubAPI.Models.ReservationModel", b =>
                {
                    b.HasOne("ClubAPI.Models.FacilitiesModel", "Facility")
                        .WithMany()
                        .HasForeignKey("Fac_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ClubAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Facility");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ClubAPI.Models.Timemodel", b =>
                {
                    b.HasOne("ClubAPI.Models.FacilitiesModel", "Facility")
                        .WithMany()
                        .HasForeignKey("Fac_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Facility");
                });
#pragma warning restore 612, 618
        }
    }
}
