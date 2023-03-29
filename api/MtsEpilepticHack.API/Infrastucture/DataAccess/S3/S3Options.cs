namespace MtsEpilepticHack.API.Infrastucture.DataAccess.S3;

public class S3Options
{
    public string DefaultBucketName { get; init; } = null!;

    public string CdnPath { get; init; } = null!;

    public string AccessKey { get; init; } = null!;

    public string SecretKey { get; init; } = null!;
}
