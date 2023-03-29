namespace MtsEpilepticHack.API.Models;

public sealed class VoiceRecognitionResult
{
    public string Action { get; init; } = null!;

    public string Descriptor { get; init; } = null!;
    
    public int? Value { get; init; }
}