using FoodPlanner.Database;
using GraphQLCodeGen;
using HotChocolate;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.API
{
  public class Query
  {
    public async Task<List<GraqhqlTypes.Recipe>> GetRecipes([Service] DbContext db)
    {
      var recipe = new Recipe(
        Id: ObjectId.GenerateNewId().ToString(),
        Name: "Recipe 5",
        Description: "Description 3",
        Ingredients: new List<RecipeIngredient>()
        {
          new RecipeIngredient("Chicken", 1, "pound"),
          new RecipeIngredient("rice", 2.5, "Cups")
        },
        Steps: new List<string>()
        {
          "Step 1",
          "step 2",
          "step 3"
        },
        Tags: new List<string>() { "Italian" });

      await db.AddRecipe(recipe);

      return await db.GetRecipes();
    }
  }
}
