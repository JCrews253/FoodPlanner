using HotChocolate.Types;

namespace FoodPlanner.API
{
  public class RecipeAddedPayload
  {
    public string Id { get; set; }
  }

  public class RecipeAddedPayloadType : ObjectType<RecipeAddedPayload>
  {
    protected override void Configure(IObjectTypeDescriptor<RecipeAddedPayload> descriptor)
    {
      descriptor.Description("Represents any software or service that has a command line interface.");

      descriptor
        .Field(r => r.Id)
        .Description("Represents the unique ID for the recipe.");

    }
  }
}