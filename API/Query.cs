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
    public async Task<List<Recipe>> GetRecipes([Service] DbContext db)
    {
      //await db.AddRecipeAsync(recipe);
      return await db.GetRecipesAsync();
    }

    [Authorize]
    public string GetEmail([Service] IHttpContextAccessor contextAccessor)
    {
      return contextAccessor.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Name).Value;
    }

    public async Task<Recipe> GetRecipe([Service] DbContext db, string recipeId)
    {
      return await db.GetRecipeAsync(recipeId);
    }
  }
}
