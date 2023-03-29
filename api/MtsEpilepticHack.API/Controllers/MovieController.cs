using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using MtsEpilepticHack.API.Infrastucture.DataAccess.S3;
using MtsEpilepticHack.API.Models;

namespace MtsEpilepticHack.API.Controllers;

[ApiController]
[Route("api/v1/movies")]
public sealed class MovieController : ControllerBase
{
    private readonly IAmazonS3 _amazonS3Client;
    private readonly S3Options _s3Options;
    
    [HttpGet]
    [ProducesDefaultResponseType(typeof(MovieDto[]))]
    public async Task<IActionResult> GetMovies()
    {
        await Task.Delay(1);
        var movies = new MovieDto[]
        {
            new()
            {
                Name = "Зеленый слоник", Description = "Ну типо",
                PreviewUrl = "https://342031.selcdn.ru/rusplt/images/06052022/1651838610319-upload.jpeg",
                PlaybackUrls = new Dictionary<QualityPreset, VideoWithSubtitles>()
                {
                    {QualityPreset.P720, new("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")},
                    {QualityPreset.P2160, new("https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4")}
                }
            }
        };
        return Ok(movies);
    }

    [HttpGet]
    [Route("{id:long}")]
    [ProducesDefaultResponseType(typeof(MovieDto))]
    public async Task<IActionResult> GetMovie([FromRoute] long id)
    {
        await Task.Delay(1);
        return Ok(            new MovieDto
        {
            Name = "Зеленый слоник", Description = "Ну типо",
            PreviewUrl = "https://342031.selcdn.ru/rusplt/images/06052022/1651838610319-upload.jpeg",
            PlaybackUrls = new Dictionary<QualityPreset, VideoWithSubtitles>()
            {
                {QualityPreset.P720, new("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")},
                {QualityPreset.P2160, new("https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4")}
            },
            PlaybackAdaptedUrls = new Dictionary<QualityPreset, VideoWithSubtitles>()
            {
                {QualityPreset.P2160, new("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")}
            }
        });
    }
}