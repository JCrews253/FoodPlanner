using FoodPlanner.Database;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data;
using Microsoft.AspNetCore.Http;
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

    [Authorize]
    public async Task<List<Recipe>> GetMyRecipes([Service] DbContext db, [Service] IHttpContextAccessor contextAccessor)
    {
      var id = contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
      return await db.GetMyRecipesAsync(id);
    }
  }
}
