using FoodPlanner.API.Models;
using FoodPlanner.Database;
using HotChocolate;
using HotChocolate.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodPlanner.API
{
  public class Mutation
  {
    //public async Task<Recipe> AddRecipe([Service] DbContext db, Recipe recipe)
    //{
    //  await db.AddRecipe(recipe);
    //
    //  return new Recipe();
    //}

    public async Task<RecipeAddedPayload> AddRecipe(Recipe recipe)
    {
      // Omitted code for brevity
      await Task.Delay(1);
      return new RecipeAddedPayload() { Id="aaa"};
    }
  }
}
