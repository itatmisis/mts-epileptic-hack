using System.Text.Json;
using MtsEpilepticHack.API.Infrastucture.Integrations.Dtos;
using MtsEpilepticHack.API.Models;

namespace MtsEpilepticHack.API.Infrastucture.Integrations;

public sealed class VoiceRecognitionClient
{
     private readonly IHttpClientFactory _httpClientFactory;
     private readonly Uri _uri;

     public VoiceRecognitionClient(IHttpClientFactory httpClientFactory)
     {
          _httpClientFactory = httpClientFactory;
          var url = Environment.GetEnvironmentVariable("VR_URL");
          if (string.IsNullOrEmpty(url))
               throw new Exception();
          _uri = new Uri(url);
     }

     public async Task<VoiceRecognitionResult> SendToRecognitionAsync(string input, CancellationToken cancellationToken)
     {
          using var client = _httpClientFactory.CreateClient();
          client.BaseAddress = _uri;
          var request = new PredictionRequest() {InputString = input};
          var result = await client.PostAsJsonAsync("predict", request, cancellationToken);
          var strResult = await result.Content.ReadAsStringAsync(cancellationToken: cancellationToken);
          var response = JsonSerializer.Deserialize<PredictionResponse>(strResult)!;
          return new VoiceRecognitionResult
          {
               Action = response.ResultArray[0],
               Value = string.IsNullOrEmpty(response.ResultArray[1]) ? null : int.Parse(response.ResultArray[1]),
               Descriptor = response.ResultArray[2]
          };
}
}