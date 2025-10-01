using Microsoft.AspNetCore.Mvc;


namespace F1SpecialEventAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment environment;

        public ImageUploadController(IWebHostEnvironment _environment)
        {
            environment = _environment;
        }

        // POST: api/ImageUpload    
        [HttpPost]
        public async Task<IActionResult> PostImage(IFormFile formFile) // parameteret her tar  i IfromFile som tar imot bilde fra wwwroot. Som skal brukes senere i JS
        {
            if (formFile == null || formFile.Length == 0)
            {
                return BadRequest("En fil må sendes med forespørselen.");
            }

            string webRootPath = environment.WebRootPath;
            string filePath = Path.Combine(webRootPath, "images", formFile.FileName);
            Path.Combine($"{webRootPath} /images/ {formFile.FileName}");


            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create)) // opretter en ny filstrøm Object som tar to agrumenter Filestien og  lage en fil
                {
                    await formFile.CopyToAsync(fileStream); // venter på filstømen blir kopiert til filstrømen 
                }

                return Ok("Bildet ble lastet opp vellykket."); // Ok returnerer om den bildet ble lastet 
            }
            catch (Exception ex)
            {
                // Eller får vi melding en statuskode 500 bad request.
                return StatusCode(500, $"En intern serverfeil oppstod: {ex.Message}");
            }
        }
    }
}
