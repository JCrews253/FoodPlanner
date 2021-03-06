using FoodPlanner.Services;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.API
{
  public class Mutation
  {
    private T ConvertToType<T>(object obj)
    {
      var jsonData = JsonConvert.SerializeObject(obj);
      return JsonConvert.DeserializeObject<T>(jsonData);
    }

    private string GetUserId(IHttpContextAccessor contextAccessor)
    {
      return contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
    }

    public async Task<string> NewRecipe([Service] IRecipeService recipeService, [Service] IHttpContextAccessor contextAccessor, RecipeInput recipe)
    {
      Recipe newRecipe = ConvertToType<Recipe>(recipe.GetInputObject());
      return await recipeService.AddRecipeAsync(newRecipe, GetUserId(contextAccessor));
    }

    [Authorize]
    public async Task<bool> SaveRecipe([Service] IUserService userService, [Service] IHttpContextAccessor contextAccessor, string recipeId, bool saved)
    {
      await userService.ModifySavedRecipesAsync(GetUserId(contextAccessor), recipeId, saved);
      return true;
    }
  }
}
