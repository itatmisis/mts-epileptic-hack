using System.Net.Http.Headers;
using System.Web;
using Amazon.Runtime;

namespace MtsEpilepticHack.API.Infrastucture.DataAccess.S3;

public static class S3Helper
{
    private const string FileNameSetParameter = "filename=";
    public static string GetNewCephKey(string fileName, string lifecycleId)
    {
        var fileGuid = Guid.NewGuid();
        return $"{lifecycleId}/{fileGuid}{Path.GetExtension(fileName)}";
    }

    public static string GetContentDispositionFromFileName(string originalFileName)
        => $"inline; {FileNameSetParameter}\"{HttpUtility.UrlEncode(originalFileName)}\"";

    public static string GetFileNameFromContentDisposition(string contentDisposition)
        => ContentDispositionHeaderValue.Parse(contentDisposition).FileName!;

    public static string GetFileUrl(string bucketName, string key)
        => $"{bucketName}/{key}";

    public static async Task<T> HandleCephResponse<T>(
        Func<Task<T>> responseHandler)
        where T : AmazonWebServiceResponse
    {
        static bool IsSuccessResponse(AmazonWebServiceResponse response)
            => (int) response.HttpStatusCode >= 200 && (int) response.HttpStatusCode < 300;

        var response = await responseHandler();

        if (!IsSuccessResponse(response))
            throw new S3Exception((int?)response?.HttpStatusCode ?? 0);

        return response;
    }
}
