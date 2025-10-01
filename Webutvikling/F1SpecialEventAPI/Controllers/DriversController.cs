using Microsoft.AspNetCore.Mvc;//gir klassen attributter som er nødvendig for å lage en kontroller
using F1SpecialEventAPI.Models;//Inneholder data i fra modellen
using F1SpecialEventAPI.Context;

using Microsoft.EntityFrameworkCore;//Denne inneholder Dbcontext som brukes for å integrere databasen 
namespace F1SpecialEventAPI.Controllers;

[Route("api/[Controller]")]// Angir rute-URL for API-endepunktene.
[ApiController]
public class DriversController : ControllerBase
{
    private readonly DriverContext driverContext;// DatabaseContekst for å håndtere databasetransaksjoner.
    private readonly ILogger<DriversController> logger;// Logger for å logge hendelser eller feil.

 // Konstruktør som initialiserer databasekonteksten
    public DriversController(DriverContext _driverContext, ILogger<DriversController> _logger)
    {
        driverContext = _driverContext;
        logger = _logger;
    }
    // HTTP GET-metode for å hente alle sjåfører.
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {   // Asynkront henter alle sjåfører fra databasen.
            var drivers = await driverContext.Drivers.ToListAsync();
            // Returnerer en return OK med listen over sjåfører.
            return Ok(drivers);
        }
        catch (Exception ex)
        {   // Logger feilmelding ved returnerer en serverfeil
            logger.LogError(ex, "En feil oppstod ved henting av sjåfører.");
            return StatusCode(500);
        }
    } 

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetDriver(int id)
    {
        try
        {   
            var driver = await driverContext.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }
            return Ok(driver);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "En feil oppstod ved henting av sjåføren med ID: {DriverId}.", id);
            return StatusCode(500);
        }
    }

    [HttpGet("title/{name}")]
    public async Task<IActionResult> GetDriverByName(string name)
    {
        try
        {
            var driver = await driverContext.Drivers.FirstOrDefaultAsync(d => d.Name == name);
            if (driver == null)
            {
                return NotFound("Ingen sjåfør funnet med det navnet.");
            }
            return Ok(driver);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Feil ved henting av sjåfør med navnet {Name}.", name);
            return StatusCode(500, "En serverfeil oppstod.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(Driver newDriver)
    {
        try
        {
            driverContext.Drivers.Add(newDriver);
            await driverContext.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "En feil oppstod ved legging til ny sjåfør.");
            return StatusCode(500, "En serverfeil oppstod.");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDriver(int id)
    {
        try
        {
            var driver = await driverContext.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }
            driverContext.Drivers.Remove(driver);
            await driverContext.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "En feil oppstod ved sletting av sjåføren med ID: {DriverId}.", id);
            return StatusCode(500, "En serverfeil oppstod ved forsøk på å slette sjåføren.");
        }
    }


   [HttpPut]
    public async Task<IActionResult> Put(Driver updatedDriver)
{
    try 
    {
        driverContext.Entry(updatedDriver).State = EntityState.Modified;
        await driverContext.SaveChangesAsync();
        return NoContent();
    }
    catch 
    {
        return StatusCode(500);
    }
}



}