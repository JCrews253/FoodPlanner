﻿using FoodPlanner.Database;
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
    public Token Login([Service] IIdentityService identityService, UserLogin inputs)
    {
      //await Task.Delay(1);
      return new Token("access", "refresh");
      //return await identityService.Authenticate(user);
    }

    public async Task<string> Register(User user, [Service] IIdentityService identityService)
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
