using ClubAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using dotenv.net;

var builder = WebApplication.CreateBuilder(args);

// โหลดค่าจาก .env
DotEnv.Load();
builder.Configuration.AddEnvironmentVariables();

//  อ่านค่าจาก Environment Variables หรือ appsettings.json
var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") 
                ?? builder.Configuration["JwtSettings:SecretKey"] 
                ?? throw new Exception("JWT Secret Key is missing!");

var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") 
                ?? builder.Configuration["JwtSettings:Issuer"]
                ?? throw new Exception("JWT Issuer is missing!");

var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") 
                  ?? builder.Configuration["JwtSettings:Audience"]
                  ?? throw new Exception("JWT Audience is missing!");

var keyBytes = Encoding.UTF8.GetBytes(secretKey);
if (keyBytes.Length == 0)
{
    throw new Exception("JWT Secret Key is empty! Check your .env file.");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")  
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

//  เพิ่ม JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        };
    });

// ตั้งค่า Database Connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

//  แก้ไข Swagger ให้รองรับ Authentication
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ClubAPI",
        Version = "v1",
        Description = "API สำหรับ ClubAPI ที่ใช้ MSSQL",
        Contact = new OpenApiContact
        {
            Name = "Chino",
            Email = "chino@example.com"
        }
    });

    //  เพิ่ม Authorization ให้ Swagger รองรับ JWT
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "ใส่ 'Bearer {token}' เพื่อยืนยันตัวตน",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

//  เพิ่ม Authorization Middleware
builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// แก้ไข Swagger UI ให้รองรับ Authentication
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ClubAPI v1");
        c.RoutePrefix = string.Empty; // ✅ ทำให้ Swagger ใช้ `/` เป็นหน้าแรก
    });
}

app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
