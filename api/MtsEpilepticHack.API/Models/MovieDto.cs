namespace MtsEpilepticHack.API.Models;

public record MovieDto
{
    public long Id { get; init; }

    public string Name { get; init; } = null!;

    public string Description { get; init; } = null!;

    public string PreviewUrl { get; init; } = null!;

    public Dictionary<QualityPreset, VideoWithSubtitles> PlaybackUrls { get; init; } = new();
    
    public Dictionary<QualityPreset, VideoWithSubtitles> PlaybackAdaptedUrls { get; init; } = new();
}