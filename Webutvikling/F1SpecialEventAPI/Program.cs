using F1SpecialEventAPI.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DriverContext>(
    options => options.UseSqlite("Data Source=Database/F1SpecialEvent.db")
);

builder.Services.AddCors(
    builder => {
        builder.AddPolicy("AllowAll", 
            policies => policies
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
        );
    }
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseStaticFiles(); // Legger til støtte for statiske filer.

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
