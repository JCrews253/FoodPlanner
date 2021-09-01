using FoodPlanner.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodPlanner.API
{
  public class Query
  {
    public IQueryable<Recipe> GetRecipes()
    {
      var r = new Recipe()
      {
        Name = "Recipe Name",
        Description = "Recipe Decription",
        Id = new Guid()
      };

      return new[] { r}.AsQueryable();
    }
  }
}
