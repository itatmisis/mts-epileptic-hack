using System.Text.Json.Serialization;

namespace MtsEpilepticHack.API.Infrastucture.Integrations.Dtos;

public class PredictionRequest
{
    [JsonPropertyName("input_string")]
    public string InputString { get; init; } = null!;
}