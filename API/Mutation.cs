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

    public async Task<bool> NewRecipe([Service] IRecipeService recipeService, [Service] IHttpContextAccessor contextAccessor, RecipeInput recipe)
    {
      Recipe newRecipe = ConvertToType<Recipe>(recipe.GetInputObject());
      await recipeService.AddRecipeAsync(newRecipe, GetUserId(contextAccessor));
      return true;
    }

    [Authorize]
    public async Task<bool> SaveRecipe([Service] IUserService userService, [Service] IHttpContextAccessor contextAccessor, string recipeId)
    {
      await userService.ModifySavedRecipesAsync(GetUserId(contextAccessor), recipeId);
      return true;
    }
  }
}
