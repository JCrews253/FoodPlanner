using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.Database
{
  public partial class DbContext
  {
    IMongoCollection<Recipe> _recipesCollection;

    private void RecipePartialCtor()
    {
      _recipesCollection = _db.GetCollection<Recipe>("Recipes");
    }

    public async Task<List<Recipe>> GetRecipesAsync()
    {
      var recipes = await _recipesCollection.FindAsync(_ => true);
      return recipes.ToList();
    }

    public async Task<Recipe> GetRecipeAsync(string id)
    {
      if(!ObjectId.TryParse(id, out _))
      {
        return null;
      }
      return await _recipesCollection.Find(r => r.Id == id).FirstOrDefaultAsync();
    }

    public async Task<List<Recipe>> GetMyRecipesAsync(string id)
    {
      return await GetRecipesAsync();
    }

    public async Task AddRecipeAsync(Recipe recipe)
    {
      var photoUrl = await AddPhoto(recipe.Photo);

      //var newRecipe = new Recipe(recipe.cookTime, recipe.description, ObjectId.GenerateNewId().ToString(), (List<RecipeIngredientInput>)recipe.ingredients, recipe.name, photoUrls, recipe.prepTime, recipe.steps, recipe.tags);
      //await _recipesCollection.InsertOneAsync(recipe with { Id = ObjectId.GenerateNewId().ToString(), photos = photoUrls.ToList() });
    }

    public async Task<string> AddPhoto(string photo)
    {
      var config = _provider.GetRequiredService<IConfiguration>();

      var containerClient = new BlobContainerClient(config["ConnectionString"], config["Container"]);
      var blobClient = containerClient.GetBlobClient(Guid.NewGuid().ToString());
      var bytes = Convert.FromBase64String(photo);
      using(var ms = new MemoryStream(bytes))
      {
        await blobClient.UploadAsync(ms);
      }   
      return blobClient.Uri.AbsoluteUri;
    }
  }
}
