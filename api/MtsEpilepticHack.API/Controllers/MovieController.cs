using Microsoft.AspNetCore.Mvc;
using MtsEpilepticHack.API.Models;

namespace MtsEpilepticHack.API.Controllers;

[ApiController]
[Route("api/v1/movies")]
public sealed class MovieController : ControllerBase
{
    [HttpGet]
    [Route("data-batch/by-timestamp")]
    [ProducesDefaultResponseType(typeof(MoviePlaybackData[]))]
    public async Task<IActionResult> GetMovieDataBatchByTimestamp(
        [FromQuery] GetMovieDataBatchByTimestampRequest request)
    {
        await Task.Delay(1);
        var datas = new List<MoviePlaybackData>((int) request.Offset + 1);
        for (var i = 0; i <= request.Offset; i++)
        {
            datas.Add(
                new MoviePlaybackData(
                    request.Timestamp.Add(TimeSpan.FromSeconds(i)),
                    new[] {new RestrictionData(123, 123, 123, 123)}));
        }

        return Ok(datas);
    }

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
                PlaybackUrls = new Dictionary<QualityPreset, string>()
                {
                    {QualityPreset.P720, "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
                    {QualityPreset.P2160, "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
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
            PlaybackUrls = new Dictionary<QualityPreset, string>()
            {
                {QualityPreset.P720, "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
                {QualityPreset.P2160, "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
            }
        });
    }
}