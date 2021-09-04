using FoodPlanner.API.Models;
using FoodPlanner.Database;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodPlanner.API
{
  public class Query
  {
    public Recipe[] GetRecipes([Service] DbContext db)
    {
      var x = db.GetRecipes().ToArray();

      return x;
    }
  }
}
