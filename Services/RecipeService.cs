using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.Services
{
  public interface IRecipeService
  {
    Task<List<Recipe>> GetAllRecipesAsync();
    Task<Recipe> GetRecipeByIdAsync(string id);
    Task<List<Recipe>> GetUserSavedRecipesAsync(string userId);
    Task<string> AddRecipeAsync(Recipe recipe, string userId);
  }

  public class RecipeService : IRecipeService
  {
    private readonly IMongoCollection<Recipe> _recipes;
    private readonly IServiceProvider _provider;

    public RecipeService(IServiceProvider provider)
    {
      _provider = provider;
      var mongoClient = _provider.GetRequiredService<IMongoClient>();
      var database = mongoClient.GetDatabase("FoodPlanner");
      _recipes = database.GetCollection<Recipe>("Recipes");
    }
    
    public async Task<List<Recipe>> GetAllRecipesAsync()
    {
      var recipes = await _recipes.FindAsync(_ => true);
      return recipes.ToList();
    }
    
    public async Task<Recipe> GetRecipeByIdAsync(string id)
    {
      return await _recipes.Find(r => r.RecipeId == id).FirstOrDefaultAsync();
    }

    public async Task<List<Recipe>> GetUserSavedRecipesAsync(string userId)
    {
      var userService = _provider.GetRequiredService<IUserService>();
      var recipeIds = await userService.GetSavedRecipeIdsAsync(userId);
      var filter = Builders<Recipe>.Filter.In(r => r.RecipeId, recipeIds);
      var recipes = await _recipes.FindAsync(filter);
      return recipes.ToList();
    }

    public async Task<string> AddRecipeAsync(Recipe recipe, string userId)
    {
      List<string> photoUrls = new List<string>();
      if(recipe.Photos != null)
      {
        var azureBlobService = _provider.GetRequiredService<IAzureBlobService>();
        var tasks = recipe.Photos.Select(async photo =>
        {
          var url = await azureBlobService.UploadPhoto(photo);
          photoUrls.Add(url);
        });
        await Task.WhenAll(tasks);
      }

      var newRecipe = new Recipe( 
        Description: recipe.Description,
        RecipeId: recipe.RecipeId,
        Ingredients: recipe.Ingredients,
        Name: recipe.Name,
        Steps: recipe.Steps,
        Photos: photoUrls,
        Tags: recipe.Tags,
        Times: recipe.Times,
        Creator: userId,
        ParentId: null
      );
      var recipeId = Guid.NewGuid().ToString();
      await _recipes.InsertOneAsync(newRecipe with { RecipeId = recipeId });
      return recipeId;
    }
  }
}
