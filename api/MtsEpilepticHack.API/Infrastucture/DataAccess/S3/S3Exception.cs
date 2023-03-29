namespace MtsEpilepticHack.API.Infrastucture.DataAccess.S3;

public class S3Exception : Exception
{
    public S3Exception(int statusCode)
        : base($"S3 response code {statusCode}")
    {
    }
}

