using Microsoft.AspNetCore.StaticFiles;

namespace MtsEpilepticHack.API.Infrastucture.DataAccess.S3;

public class ContentTypeProvider
{
    private readonly IContentTypeProvider _contentTypeProvider;

    public ContentTypeProvider(IContentTypeProvider contentTypeProvider)
        => _contentTypeProvider = contentTypeProvider;

    public string GetContentType(string fileName)
    {
        var fileExtension = Path.GetExtension(fileName).ToLower();
        if (_contentTypeProvider.TryGetContentType(fileName, out var standardContentType))
            return standardContentType;

        throw new Exception(fileExtension);
    }
}

