using FoodPlanner.API.Models;
using FoodPlanner.Database;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodPlanner.API
{
  public class Query
  {
    public async Task<List<Recipe>> GetRecipes([Service] DbContext db)
    {
      var recipe = new Recipe()
      {
        Name = "Recipe 3",
        Description = "Description 3",
        Ingredients = new List<RecipeIngredient>()
        {
          new RecipeIngredient()
          {
            Ingredient = "Chicken",
            Amount = 1,
            Unit = "pound"
          },
          new RecipeIngredient()
          {
            Ingredient = "rice",
            Amount = 2.5,
            Unit = "Cups"
          }
        },
        Steps = new List<string>()
        {
          "Step 1",
          "step 2",
          "step 3"
        },
        Tags = new List<string>() { "Italian" }
      };

      //db.AddRecipe(recipe);

      return await db.GetRecipes();
    }
  }
}
