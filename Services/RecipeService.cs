using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.Services
{
  public interface IRecipeService
  {
    Task<List<Recipe>> GetAllRecipesAsync();
    Task<Recipe> GetRecipeByIdAsync(string id);
    Task<List<Recipe>> GetUserSavedRecipesAsync(string userId);
    Task AddRecipeAsync(Recipe recipe);
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
      if (!ObjectId.TryParse(id, out _))
      {
        return null;
      }
      return await _recipes.Find(r => r.Id == id).FirstOrDefaultAsync();
    }

    public async Task<List<Recipe>> GetUserSavedRecipesAsync(string userId)
    {
      var userService = _provider.GetRequiredService<IUserService>();
      var recipeIds = await userService.GetSavedRecipeIdsAsync(userId);
      var filter = Builders<Recipe>.Filter.In(r => r.Id, recipeIds);
      var recipes = await _recipes.FindAsync(filter);
      return recipes.ToList();
    }

    public async Task AddRecipeAsync(Recipe recipe)
    {
      var azureBlobService = _provider.GetRequiredService<IAzureBlobService>();
      var photoUrl = await azureBlobService.UploadPhoto(recipe.Photo);

      //var newRecipe = new Recipe(recipe.cookTime, recipe.description, ObjectId.GenerateNewId().ToString(), (List<RecipeIngredientInput>)recipe.ingredients, recipe.name, photoUrls, recipe.prepTime, recipe.steps, recipe.tags);
      //await _recipesCollection.InsertOneAsync(recipe with { Id = ObjectId.GenerateNewId().ToString(), photos = photoUrls.ToList() });
    }
  }
}
