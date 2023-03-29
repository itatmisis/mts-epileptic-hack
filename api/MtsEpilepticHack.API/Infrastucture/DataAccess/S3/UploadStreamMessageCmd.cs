namespace MtsEpilepticHack.API.Infrastucture.DataAccess.S3;

public class UploadStreamMessageCmd
{
    public string FileName { get; set; } = null!;
    public byte[] Data { get; set; } = null!;
    public bool IsLastPart { get; set; }
    public LifecycleOptions LifecycleOptions { get; set; } = new();
    public string? BucketName { get; set; }
}

