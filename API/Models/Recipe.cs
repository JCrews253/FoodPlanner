using HotChocolate.Types;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodPlanner.API.Models
{
  public class Recipe
  {
    [BsonId]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
  }

  public class RecipeType : ObjectType<Recipe>
  {
    protected override void Configure(IObjectTypeDescriptor<Recipe> descriptor)
    {
      descriptor.Description("Represents any software or service that has a command line interface.");

      descriptor
          .Field(p => p.Id)
          .Type<IdType>()
          .Resolver(r => r.Parent<Recipe>().Id.ToString())
          .Description("Represents the unique ID for the recipe.");

      descriptor
          .Field(p => p.Name)
          .Description("Represents the name for the recipe.");

      descriptor
          .Field(p => p.Description)
          .Description("This is the description of the recipe.");
    }
  }
}
