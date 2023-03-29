using System.Text.Json.Serialization;
using MtsEpilepticHack.API.Infrastucture.Integrations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<VoiceRecognitionClient>();
builder.Services.AddSingleton<VideoProcessingClient>();
builder.Services.AddHttpClient();
builder.Services.ConfigureHttpJsonOptions(x => x.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(x
    =>
{
    x.AllowAnyHeader();
    x.AllowCredentials();
    x.AllowAnyOrigin();
});
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();