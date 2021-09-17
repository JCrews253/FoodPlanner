using FoodPlanner.Database;
using FoodPlanner.Services;
using HotChocolate;
using HotChocolate.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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

    public async Task<Token> Login([Service] IIdentityService identityService, UserInput user)
    {
      User loginUser = ConvertToType<User>(user.GetInputObject());
      return await identityService.Authenticate(loginUser);
    }

    public async Task<string> Register([Service] IIdentityService identityService, UserInput user)
    {
      User newUser = ConvertToType<User>(user.GetInputObject());
      return await identityService.Register(newUser);
    }

    public async Task<bool> AddRecipe([Service] DbContext db, RecipeInput recipe)
    {
      Recipe newRecipe = ConvertToType<Recipe>(recipe.GetInputObject());
      await db.AddRecipeAsync(newRecipe);
      return true;
    }
  }
}
