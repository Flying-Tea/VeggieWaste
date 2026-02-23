using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using app.Backend.Services;

namespace VeggieWaste.Backend.Controllers
{
    [ApiController]
    [Route("api/veggie")]
    public class VeggieController : ControllerBase
    {
        private readonly VeggieClassification _classifier;

        public VeggieController(VeggieClassification classifier)
        {
            _classifier = classifier;
        }

        [HttpPost("classify")]
        public async Task<IActionResult> ClassifyVeggie([FromForm] IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("No image uploaded.");

            using var stream = image.OpenReadStream();
            using var img = await Image.LoadAsync<Rgb24>(stream);

            var (label, confidence) = _classifier.ClassifyVeggie(img);

            return Ok(new
            {
                label,
                confidence = Math.Round(confidence * 100, 2)
            });
        }
    }
}