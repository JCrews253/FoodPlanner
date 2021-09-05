//[BsonRepresentation(BsonType.ObjectId)]
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GraphQLCodeGen {
  public class GraqhqlTypes {
    
    #region Query
    public record Query(List<Recipe> GetRecipes) {
      #region members
      public List<Recipe> GetRecipes { get; init; } = GetRecipes;
      #endregion
    }
    #endregion
    
    #region Recipe
    public record Recipe(string Id, string Name, string Description, List<RecipeIngredient> Ingredients, List<string> Steps, List<string> Tags) {
      #region members
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public string Name { get; init; } = Name;
    
      public string Description { get; init; } = Description;
    
      public List<RecipeIngredient> Ingredients { get; init; } = Ingredients;
    
      public List<string> Steps { get; init; } = Steps;
    
      public List<string> Tags { get; init; } = Tags;
      #endregion
    }
    #endregion
    
    #region RecipeIngredient
    public record RecipeIngredient(string Ingredient, double Amount, string Unit) {
      #region members
      public string Ingredient { get; init; } = Ingredient;
    
      public double Amount { get; init; } = Amount;
    
      public string Unit { get; init; } = Unit;
      #endregion
    }
    #endregion
  }
  
}
