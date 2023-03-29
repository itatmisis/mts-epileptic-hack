using System.Text.Json.Serialization;

namespace MtsEpilepticHack.API.Infrastucture.Integrations.Dtos;

public class PredictionResponse
{
    [JsonPropertyName("result")]
    public string[] ResultArray { get; init; } = null!;
}