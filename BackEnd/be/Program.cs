using Microsoft.EntityFrameworkCore;
using CMPS411_EzTicketz_Fall2024.Data;
using CMPS411_EzTicketz_Fall2024.Controllers;
using CMPS411_EzTicketz_Fall2024.Services; // Ensure this matches the AuthService namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register your DbContext with the connection string from appsettings.json
builder.Services.AddDbContext<YourDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));

// Register AuthService as a scoped dependency
builder.Services.AddScoped<AuthService>();

// Register HttpClient for CompanyController
builder.Services.AddHttpClient<CompanyController>();

// Configure CORS (if needed)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Enable Swagger/OpenAPI for API documentation in development
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins"); // Add CORS middleware
app.UseAuthorization();

app.MapControllers();

app.Run();
