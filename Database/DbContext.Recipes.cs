using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
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
      return await _recipesCollection.Find(r => r.Id == id).FirstAsync();
    }

    public async Task AddRecipeAsync(Recipe recipe)
    {
      await _recipesCollection.InsertOneAsync(recipe with { Id = ObjectId.GenerateNewId().ToString() });
    }
  }
}
