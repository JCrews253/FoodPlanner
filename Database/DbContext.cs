using FoodPlanner.API.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodPlanner.Database
{
  public class DbContext
  {
    IMongoDatabase _db;
    IMongoCollection<Recipe> _recipesCollection;

    public DbContext(IMongoClient client)
    {
      _db = client.GetDatabase("FoodPlanner");
      _recipesCollection = _db.GetCollection<Recipe>("Recipes");
    }

    public async Task<List<Recipe>> GetRecipes()
    {
      var recipes = await _recipesCollection.FindAsync(_ => true);
      return recipes.ToList();
    }

    public async Task AddRecipe(Recipe recipe)
    {
      await _recipesCollection.InsertOneAsync(recipe);
    }
  }
}
