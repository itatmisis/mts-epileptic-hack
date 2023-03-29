using Amazon.Internal;
using Amazon.Runtime;
using Amazon.S3;

namespace MtsEpilepticHack.API.Infrastucture.DataAccess.S3;

public static class DiExtensions
{
    public static IServiceCollection SetupAws(this IServiceCollection services, IConfiguration config)
    {
        var awsOptions = config.GetAWSOptions();
        var cephOptions = config
            .GetSection(nameof(S3Options))
            .Get<S3Options>()!;
        services
            .AddOptions<S3Options>()
            .Configure<IConfiguration>((options, config) => config.GetSection(nameof(S3Options)).Bind(options))
            .ValidateDataAnnotations();

        awsOptions.Credentials = new BasicAWSCredentials(cephOptions.AccessKey, cephOptions.SecretKey);
        return services
            .AddDefaultAWSOptions(awsOptions)
            .AddAWSService<IAmazonS3>();
    }

}
