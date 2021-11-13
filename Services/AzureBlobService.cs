using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Threading.Tasks;

namespace FoodPlanner.Services
{
  public interface IAzureBlobService
  {
    /// <summary>
    /// Uploads a base64 encoded image to Azure blob storage.
    /// </summary>
    /// <param name="photo">Base64 encoded string.</param>
    /// <returns>Absolute Uri to image.</returns>
    Task<string> UploadPhoto(string photo);
  }

  public class AzureBlobService : IAzureBlobService
  {
    private readonly IServiceProvider _provider;

    public AzureBlobService(IServiceProvider provider)
    {
      _provider = provider;
    }

    // <inheritdoc />
    public async Task<string> UploadPhoto(string photo)
    {
      var config = _provider.GetRequiredService<IConfiguration>();
      var containerClient = new BlobContainerClient(config["ConnectionString"], config["Container"]);
      var blobClient = containerClient.GetBlobClient(Guid.NewGuid().ToString());
      var bytes = Convert.FromBase64String(photo);
      using (var ms = new MemoryStream(bytes))
      {
        await blobClient.UploadAsync(ms);
      }
      return blobClient.Uri.AbsoluteUri;
    }
  }
}
