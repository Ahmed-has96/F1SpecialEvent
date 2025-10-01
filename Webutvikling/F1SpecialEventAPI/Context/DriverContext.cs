using F1SpecialEventAPI.Models;

using Microsoft.EntityFrameworkCore;

namespace F1SpecialEventAPI.Context;



// DriverContext sørger for forbindelsen til databasen
public class DriverContext : DbContext
{

    public DriverContext(DbContextOptions<DriverContext> options):base(options){}

    // Konstruktøren setter opp databasetilkoblingen
    public DbSet<Driver> Drivers {get; set;}

}