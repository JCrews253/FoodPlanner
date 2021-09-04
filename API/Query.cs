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
    public List<Recipe> GetRecipes([Service] DbContext db)
    {
      return db.GetRecipes();
    }
  }
}
