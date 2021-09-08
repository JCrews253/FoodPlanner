using FoodPlanner.Database;
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
    public async Task<bool> AddRecipe([Service] DbContext db, Recipe recipe)
    {
      await db.AddRecipeAsync(recipe);
      return true;
    }
  }
}
