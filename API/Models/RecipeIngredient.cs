using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodPlanner.API.Models
{
  public class RecipeIngredient
  {
    public string Ingredient { get; set; }
    public double Amount { get; set; }
    public string Unit { get; set; }
  }

  public class RecipeIngredientType : ObjectType<RecipeIngredient>
  {
    protected override void Configure(IObjectTypeDescriptor<RecipeIngredient> descriptor)
    {
      descriptor.Description("");

      descriptor
        .Field(r => r.Ingredient)
        .Description("");

      descriptor
        .Field(r => r.Amount)
        .Description("");

      descriptor
        .Field(r => r.Unit)
        .Description("");
    }
  }
}
