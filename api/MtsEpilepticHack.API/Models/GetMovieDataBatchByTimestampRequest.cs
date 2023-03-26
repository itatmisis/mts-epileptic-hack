namespace MtsEpilepticHack.API.Models;

public record GetMovieDataBatchByTimestampRequest(
    long Id,
    DateTime Timestamp,
    long Offset,
    QualityPreset QualityPreset);