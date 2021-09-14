using FoodPlanner.Database;
using FoodPlanner.Services;
using HotChocolate;
using HotChocolate.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.API
{
  public class Mutation
  {
    public async Task<Token> Login([Service] IIdentityService identityService, UserInput user)
    {
      return await identityService.Authenticate(user);
    }

    public async Task<string> Register([Service] IIdentityService identityService, UserInput user)
    {
      return await identityService.Register(user);
    }

    public async Task<bool> AddRecipe([Service] DbContext db, Recipe recipe)
    {
      await db.AddRecipeAsync(recipe);
      return true;
    }
  }
}
