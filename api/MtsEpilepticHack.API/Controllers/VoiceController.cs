using Microsoft.AspNetCore.Mvc;
using MtsEpilepticHack.API.Infrastucture.Integrations;
using MtsEpilepticHack.API.Models;

namespace MtsEpilepticHack.API.Controllers;

[ApiController]
[Route("api/v1/voice")]
public sealed class VoiceController : ControllerBase
{
    private readonly VoiceRecognitionClient _client;

    public VoiceController(VoiceRecognitionClient client)
        => _client = client;

    [HttpGet("{input}")]
    [ProducesDefaultResponseType(typeof(VoiceRecognitionResult))]
    public async Task<IActionResult> Recognize([FromRoute]string input)
    {
        var result = await _client.SendToRecognitionAsync(input, HttpContext.RequestAborted);
        return Ok(result);
    }
}