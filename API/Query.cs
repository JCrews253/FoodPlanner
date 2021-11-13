using FoodPlanner.Services;
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
    public async Task<List<Recipe>> GetRecipes([Service] IRecipeService recipeService)
    {
      return await recipeService.GetAllRecipesAsync();
    }

    [Authorize]
    public string GetEmail([Service] IHttpContextAccessor contextAccessor)
    {
      return contextAccessor.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Name).Value;
    }

    public async Task<Recipe> GetRecipe([Service] IRecipeService recipeService, string recipeId)
    {
      return await recipeService.GetRecipeByIdAsync(recipeId);
    }

    [Authorize]
    public async Task<List<Recipe>> GetMyRecipes([Service] IRecipeService recipeService, [Service] IHttpContextAccessor contextAccessor)
    {
      var id = contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
      return await recipeService.GetUserSavedRecipesAsync(id);
    }
  }
}
