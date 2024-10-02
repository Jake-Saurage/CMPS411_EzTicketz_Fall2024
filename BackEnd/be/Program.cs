using Microsoft.EntityFrameworkCore;
using CMPS411_EzTicketz_Fall2024.Data; // Adjust the namespace if needed

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register your DbContext
builder.Services.AddDbContext<YourDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString"))); // Replace with your connection string

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

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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
