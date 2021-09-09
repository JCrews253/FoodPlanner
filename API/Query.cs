using FoodPlanner.Database;
using GraphQLCodeGen;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.API
{
  public class Query
  {
    [UseFiltering]
    [UseSorting]
    [Authorize]
    public async Task<List<Recipe>> GetRecipes([Service] DbContext db)
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

      //await db.AddRecipeAsync(recipe);

      return await db.GetRecipesAsync();
    }

    [Authorize]
    public string GetEmail([Service] IHttpContextAccessor contextAccessor)
    {
      return contextAccessor.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Name).Value;
    }
  }
}
